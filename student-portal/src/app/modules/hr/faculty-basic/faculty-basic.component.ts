import { Component, OnInit } from '@angular/core';
import { HrService } from '../../../services/hr.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ViewModal } from '../../../components/shared/view-modal/view-modal.component';
@Component({
  selector: 'app-faculty-basic',
  imports: [ReactiveFormsModule, CommonModule, MatSelectModule, MatFormFieldModule, ViewModal],
  templateUrl: './faculty-basic.component.html',
  styleUrl: './faculty-basic.component.css',
})
export class FacultyBasic implements OnInit {
  faculties: any[] = [];
  isModalOpen = false;
  isViewModalOpen = false;
  selectedFaculty: any = null;
  courseDropdown: any[] = [];
  departmentDropdown: any[] = [];
  id = 0;
  facultyForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    dob: new FormControl('', [Validators.required]),
    doj: new FormControl('', [Validators.required]),
    address: new FormControl('', Validators.required),
    highest_qualification: new FormControl('', Validators.required),
    years_of_experience: new FormControl('', [Validators.required, Validators.min(0)]),
    courses_Handled: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
    department: new FormControl('', Validators.required),
  });

  constructor(
    private hrService: HrService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadFaculties();
  }

  loadFaculties() {
    this.hrService.getFaculties().subscribe({
      next: (res: any) => {
        this.faculties = res || [];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.faculties = [];
      },
    });
  }

  onAddFaculty() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.facultyForm.reset();
  }

  saveFaculty() {
    console.log("this.facultyForm",this.facultyForm.invalid)
    if (this.facultyForm.invalid) return;

    const facultyData = this.facultyForm.value;
    if( this.id == 0){

      this.hrService.createFaculty(facultyData).subscribe((res:any)=>{
        this.isModalOpen = false
         this.loadFaculties()
  
      })
    }
    else{
      this.hrService.updateFaculty(this.id,facultyData).subscribe((res:any)=>{
        this.isModalOpen = false
         this.loadFaculties()
  
      })
    }
  }
  editFaculty(id: number) {
    this.id = id;
    if (this.departmentDropdown.length == 0) this.getDeptDropdown();
    if (this.courseDropdown.length == 0) this.getCourseDropdown();
    // Optional: Reset form to clear previous data
    this.facultyForm.reset();

    this.hrService.getSingleFaculty(id).subscribe((res: any) => {
      this.facultyForm.patchValue(res);
      this.isModalOpen = true;
    });
    this.cdr.detectChanges();

  }

  deleteFaculty(id: number) {
    if (confirm('Are you sure you want to delete this faculty?')) {
      this.hrService.deleteFaculty(id).subscribe({
        next: () => {
          this.loadFaculties();
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }
  addFaculty() {
    this.facultyForm.reset();
    this.id = 0

    this.isModalOpen = true;
    if (this.departmentDropdown.length == 0) this.getDeptDropdown();
    if (this.courseDropdown.length == 0) this.getCourseDropdown();
  }
  viewFaculty(id: number) {
    this.hrService.getSingleFaculty(id).subscribe({
      next: (res: any) => {
        this.selectedFaculty = res;
        this.isViewModalOpen = true;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  closeViewModal() {
    this.isViewModalOpen = false;
    this.selectedFaculty = null;
  }

  getDeptDropdown() {
    this.hrService.getDeptDropdown().subscribe({
      next: (res: any) => {
        this.departmentDropdown = res || [];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.departmentDropdown = [];
      },
    });
  }
  getCourseDropdown() {
    this.hrService.getCourseDropdown().subscribe({
      next: (res: any) => {
        this.courseDropdown = res || [];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.courseDropdown = [];
      },
    });
  }
}
