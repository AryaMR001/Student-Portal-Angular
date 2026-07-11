import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Course } from './course/course.component';
import { Department } from './department/department.component';
import { FacultyBasic } from './faculty-basic/faculty-basic.component';
import { FacultyExperiance } from './faculty-experiance/faculty-experiance.component';
const routes: Routes = [
  { path: 'course', component: Course },
  { path: 'department', component: Department },
  { path: 'faculty-basic', component: FacultyBasic },
  { path: 'faculty-experiance', component: FacultyExperiance }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HrRoutingModule {}
