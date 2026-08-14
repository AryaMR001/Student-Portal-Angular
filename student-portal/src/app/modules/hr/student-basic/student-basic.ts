import { Component, OnInit, signal } from '@angular/core';
import { HrService } from '../../../services/hr.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-student-basic',
  imports: [CommonModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './student-basic.html',
  styleUrls: ['./student-basic.css'],
})
export class StudentBasic {
  students = signal<any[]>([]);
  isModalOpen = signal(false);
  isViewModalOpen = signal(false);
  id = signal(0);
  selectedFaculty = signal<any>(null);
  facultyDropdown = signal<any[]>([]);
  departmentDropdown = signal<any[]>([]);
  courseDropdown = signal<any[]>([]);
  isEditMode = signal(false);

  studentForm: FormGroup = new FormGroup({
  name: new FormControl('', Validators.required),
  dob: new FormControl('', Validators.required),
  department: new FormControl('', Validators.required),
  course: new FormControl('', Validators.required),
  doj: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.required, Validators.email]),
  phone_number: new FormControl('', [
    Validators.required,
    Validators.pattern(/^[0-9]{10}$/)
  ])
});

  constructor(private hrService: HrService) {}
  addStudent() {
    this.studentForm.reset();
    this.isModalOpen.set(true);
    this.id.set(0);
    this.isEditMode.set(false);
  }
  ngOnInit(): void {
    this.loadStudents();
    this.departmentDropdownData();
    this.courseDropdownData();
  }
  loadStudents() {
    this.hrService.getStudent().subscribe({
      next: (res: any) => {
        this.students.set(res || []);
      },
      error: (err) => {
        console.error(err);
        this.students.set([]);
      },
    });
  }
  departmentDropdownData() {
    this.hrService.getDeptDropdown().subscribe({
      next: (res: any) => {
        this.departmentDropdown.set(res || []);
      },
      error: (err) => {
        console.error(err);
        this.departmentDropdown.set([]);
      },
    });
  }
  courseDropdownData() {
    this.hrService.getCourseDropdown().subscribe({
      next: (res: any) => {
        this.courseDropdown.set(res || []);
      },
      error: (err) => {
        console.error(err);
        this.courseDropdown.set([]);
      },
    });
  }
  editStudent(id: number) {
    this.isModalOpen.set(true);
    this.id.set(id);
    this.hrService.getSingleStudent(id).subscribe({
      next: (res: any) => {
        this.studentForm.patchValue(res);
        this.isEditMode.set(true);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  viewStudent(id: number) {
    this.isViewModalOpen.set(true);
    this.id.set(id);
    this.hrService.getSingleStudent(id).subscribe({
      next: (res: any) => {
        this.selectedFaculty.set(res);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  deleteStudent(id: number) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.hrService.deleteStudent(id).subscribe({
        next: () => {
          this.loadStudents();
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }
  saveStudent() {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    const studentData = this.studentForm.value;

    if (this.id() === 0) {
      // Create new student
      this.hrService.createStudent(studentData).subscribe({
        next: () => {
          this.isModalOpen.set(false);
          this.loadStudents();
        },
        error: (err) => {
          console.error(err);
        },
      });
    } else {
      // Update existing student
      this.hrService.updateStudent(this.id(), studentData).subscribe({
        next: () => {
          this.isModalOpen.set(false);
          this.loadStudents();
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }

}
