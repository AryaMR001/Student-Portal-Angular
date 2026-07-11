import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from './course/course.component';
import { HrRoutingModule } from './hr-routing-module';
import { CommonUiModule } from '../common/common-ui-module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HrRoutingModule,
    CommonUiModule,
    MatSelectModule,
    MatFormFieldModule, 
    MatCheckboxModule
  ],
})
export class HrModule {}
