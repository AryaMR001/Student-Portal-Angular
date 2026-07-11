import { Component, OnInit } from '@angular/core';
import { HrService } from '../../../services/hr.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-department',
  standalone: true,   // ✅ IMPORTANT FIX
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css',
})
export class Department implements OnInit {

  departments: any[] = [];
  isModalOpen = false;

  deptForm: FormGroup = new FormGroup({
    code: new FormControl('', [Validators.required, Validators.maxLength(5)]),
    name: new FormControl('', Validators.required)
  });

  constructor(private hrService: HrService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadDepartments(); // ✅ clean separation
  }

  loadDepartments() {
    this.hrService.getDepartments().subscribe({
      next: (res: any) => {
        this.departments = res || [];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.departments = [];
      }
    });
  }

  onAddDepartment() {
    this.isModalOpen = true; // ✅ not toggle
  }

  closeModal() {
    this.isModalOpen = false;
    this.deptForm.reset();
  }
  addDepartment() {
    this.deptForm.reset();
    this.isModalOpen = true;
  }
  saveDepartment() {
   
    if (this.deptForm.invalid) return;

    const departmentData = this.deptForm.value;

    this.hrService.createDepartment(departmentData).subscribe({
      next: (res: any) => {
        this.departments = [...this.departments, res]; // ✅ safer than push
        this.closeModal();
      }
    });
  }
  deleteDepartment(id: number) {
    if (!confirm('Are you sure you want to delete this department?')) return;

    this.hrService.deleteDepartment(id).subscribe({
      next: () => {
        this.departments = this.departments.filter(dept => dept.id !== id);
      }
    });
  }

  editDepartment(department: any) {
    this.deptForm.setValue({
      code: department.code,
      name: department.name
    });
    this.isModalOpen = true;
  }

  updateDepartment(id: number) {
    if (this.deptForm.invalid) return;

    const updatedData = this.deptForm.value;

    this.hrService.updateDepartment(id, updatedData).subscribe({
      next: (res: any) => {
        const index = this.departments.findIndex(dept => dept.id === id);
        if (index !== -1) {
          this.departments[index] = res;
        }
        this.closeModal();
      }
    });
  }
}