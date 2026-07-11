import { Component, OnInit } from '@angular/core';
import { HrService } from '../../../services/hr.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-course',
   standalone: true,   // ✅ IMPORTANT FIX
  imports: [ReactiveFormsModule, CommonModule],

 templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class Course implements OnInit {
  constructor(private hrService: HrService, private cdr: ChangeDetectorRef) {}
  department: any[] = [];
  courses: any[] = [];
  isModalOpen = false;

  ngOnInit(): void {
    this.loadCourses();
    this.getDeptDropdown();
  }

  loadCourses() {
    this.hrService.getCourses().subscribe({
      next: (res: any) => {
        this.courses = res || [];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.courses = [];
      }
    });
  }

  addCourse() {
    this.isModalOpen = true;
  }

  onAddCourse(){
    
  }
  courseForm: FormGroup = new FormGroup({
    code: new FormControl('', [Validators.required, Validators.maxLength(5)]),
    name: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    duration: new FormControl('', Validators.required)

  });
  getDeptDropdown() {
    this.hrService.getDeptDropdown().subscribe({
      next: (res: any) => {
        this.department = res || [];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.department = [];
      }
    });
  }
  saveCourse() {
    if (this.courseForm.invalid) return;

    const courseData = this.courseForm.value;
    this.hrService.createCourse(courseData).subscribe({
      next: (res) => {
        console.log('Course created successfully:', res);
        this.courseForm.reset();
        this.isModalOpen = false;
        this.loadCourses(); // Refresh the course list
      },
      error: (err) => {
        console.error('Error creating course:', err);
      }
    });
  } 
  editCourse(course: any) {
    this.courseForm.patchValue({
      code: course.code,
      name: course.name,
      departments: course.departments,
      duration: course.duration
    });
    this.isModalOpen = true;
  }

  deleteCourse(id: number) {
    if (!confirm('Are you sure you want to delete this course?')) return;

    this.hrService.deleteCourse(id).subscribe({
      next: () => {
        this.courses = this.courses.filter(course => course.id !== id);
      },
      error: (err) => {
        console.error('Error deleting course:', err);
      }
    });
  }
}
