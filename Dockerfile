#############
### build ###
#############

# base image
FROM node:12-alpine as build
# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies

# add app
COPY . /app

RUN rm -rf /app/node_modules && rm package-lock.json

RUN npm install
RUN npm install -g @angular/cli@8

# generate build
RUN ng build --prod="true" --output-path=dist

############
### prod ###
############

# base image
FROM nginx:1.16.0-alpine

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# copy artifact build from the 'build environment'
COPY --from=build /app/dist /usr/share/nginx/html

# expose port 80
EXPOSE $PORT

# run nginx
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
