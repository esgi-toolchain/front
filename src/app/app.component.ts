import {Component, OnInit} from '@angular/core';
import {StudentService} from './services/student/student.service';
import {Skill, Student} from './interfaces/Student';
import {SkillService} from './services/skill/skill.service';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-tool-chain-front';
  students: Student[];
  current: MatTableDataSource<Skill> = new MatTableDataSource<Skill>();
  displayedColumns = ['id', 'name', 'coef', 'cc', 'exam'];
  currentSkill: Skill = {cc: 0, coef: 0, exam: 0, id: 0, name: '', studentId: 1};

  constructor(private studentService: StudentService, private skillService: SkillService) {
  }

  ngOnInit(): void {
    this.studentService.getAll().subscribe(students => {
      this.students = students;
    });

    this.studentService.getById(1).subscribe(student => {
      this.current.data = student.skills;
    });
  }

  changeUser(): void {
    this.studentService.getById(this.currentSkill.studentId).subscribe(student => {
      this.current.data = student.skills;
    });
  }


  addSkill(): void {
    this.skillService.create(this.currentSkill).subscribe(skill => {
        this.current.data = [...this.current.data, skill];
      this.currentSkill = {cc: 0, coef: 0, exam: 0, id: 0, name: '', studentId: this.currentSkill.studentId};
    });
  }


}
