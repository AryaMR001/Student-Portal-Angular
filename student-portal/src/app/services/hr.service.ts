import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class HrService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getDepartments() {
    return this.http.get(`${this.baseUrl}/api/v1/hr/department/`);
  }
  createDepartment(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/hr/department/`, data);
  }
  deleteDepartment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/v1/hr/department/${id}/`);
  }
  updateDepartment(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/v1/hr/department/${id}/`, data);
  }
  getCourses() {
    return this.http.get(`${this.baseUrl}/api/v1/hr/course-list/`);
  }
  createCourse(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/hr/course/`, data);
  }
  deleteCourse(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/v1/hr/course/${id}/`);
  }
  updateCourse(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/v1/hr/course/${id}/`, data);
  }
  getDeptDropdown() {
    return this.http.get(`${this.baseUrl}/api/v1/hr/department-dropdown/`);
  }
  getFaculties() {
    return this.http.get(`${this.baseUrl}/api/v1/hr/faculty-department/`);
  }
  createFaculty(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/hr/faculty/`, data);
  }
  deleteFaculty(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/v1/hr/faculty/${id}/`);
  }
  updateFaculty(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/v1/hr/faculty/${id}/`, data);
  } 
  getCourseDropdown() {
    return this.http.get(`${this.baseUrl}/api/v1/hr/course-dropdown/`);
  }
  getSingleFaculty(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/v1/hr/faculty/${id}/`);
  }
  getFacultyExperiance() {
    return this.http.get(`${this.baseUrl}/api/v1/hr/faculty-experaince-detail/`);
  }
  createFacultyExperiance(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/hr/faculty-experaince/`, data);
  }
  deleteFacultyExperiance(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/v1/hr/faculty-experaince/${id}/`);
  }
  updateFacultyExperiance(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/v1/hr/faculty-experaince/${id}/`, data);
  } 
  getSingleExperiance(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/v1/hr/faculty-experaince/${id}/`);
  } 
  facultyDropdown(){
    return this.http.get(`${this.baseUrl}/api/v1/hr/faculty-dropdown/`)
  }
}
