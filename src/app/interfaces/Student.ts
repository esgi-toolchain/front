export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  skills?: Skill[];
}

export interface Skill {
  id: number;
  name: string;
  coef: number;
  cc: number;
  exam: number;
  student?: Student;
  studentId?: number;
}
