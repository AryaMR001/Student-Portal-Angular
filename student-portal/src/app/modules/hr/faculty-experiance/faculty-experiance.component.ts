import { Component, OnInit, signal } from '@angular/core';
import { HrService } from '../../../services/hr.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-faculty-experiance',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './faculty-experiance.component.html',
  styleUrl: './faculty-experiance.component.css',
})
export class FacultyExperiance implements OnInit {
  faculties = signal<any[]>([]);
  isModalOpen = signal(false);
  isViewModalOpen = signal(false);
  id = signal(0);

  selectedFaculty = signal<any>(null);

  facultyDropdown = signal<any[]>([]);
  departmentDropdown = signal<any[]>([]);

  facultyForm: FormGroup = new FormGroup({
    faculty: new FormControl('', Validators.required),

    previous_institution: new FormControl('', Validators.required),

    position: new FormControl('', Validators.required),

    start_date: new FormControl('', Validators.required),

    end_date: new FormControl('', Validators.required),
  });

  constructor(private hrService: HrService) {}

  ngOnInit(): void {
    this.loadFacultyExperiance();
    this.facultyDropdownData();
  }

  addFacultyExperiance() {
    this.facultyForm.reset();
    this.isModalOpen.set(true);
    this.id.set(0);
  }

  saveFaculty() {
    if (this.facultyForm.invalid) {
      this.facultyForm.markAllAsTouched();
      return;
    }

    const data = this.facultyForm.value;
    if (this.id() == 0) {
      this.hrService.createFacultyExperiance(data).subscribe({
        next: () => {
          this.isModalOpen.set(false);
          this.loadFacultyExperiance();
        },
        error: (err) => {
          console.error(err);
        },
      });
    } else {
      this.hrService.updateFacultyExperiance(this.id(), data).subscribe({
        next: () => {
          this.isModalOpen.set(false);
          this.loadFacultyExperiance();
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }

  editFaculty(id: number) {
    this.isModalOpen.set(true);
    this.id.set(id);

    this.hrService.getSingleExperiance(id).subscribe((res: any) => {
      this.facultyForm.patchValue(res);
    });
  }

  viewFaculty(id: number) {
    this.hrService.getSingleFaculty(id).subscribe({
      next: (res) => {
        this.selectedFaculty.set(res);
        this.isViewModalOpen.set(true);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  deleteFaculty(id: number) {
    this.hrService.deleteFacultyExperiance(id).subscribe({
      next: () => {
        this.loadFacultyExperiance();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  loadFacultyExperiance() {
    this.hrService.getFacultyExperiance().subscribe({
      next: (res: any) => {
        this.faculties.set(res || []);
      },
      error: (err) => {
        console.error(err);

        this.faculties.set([]);
      },
    });
  }

  loadDepartments() {
    this.hrService.getDeptDropdown().subscribe({
      next: (res: any) => {
        this.departmentDropdown.set(res || []);
      },
    });
  }

  // Helper to check for errors in the template
  hasError(field: string) {
    const control = this.facultyForm.get(field);
    return control?.invalid && (control?.touched || control?.dirty);
  }
  facultyDropdownData() {
    this.hrService.facultyDropdown().subscribe({
      next: (res: any) => {
        this.facultyDropdown.set(res || []);
      },
    });
  }
}
