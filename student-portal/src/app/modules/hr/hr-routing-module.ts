import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Course } from './course/course.component';
const routes: Routes = [
  { path: 'course', component: Course }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HrRoutingModule {}
