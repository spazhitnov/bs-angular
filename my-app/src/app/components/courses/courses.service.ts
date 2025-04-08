import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/app.model';
import { HelperService } from 'src/app/services/helper.service';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private url: string = 'http://localhost:3000';
  courses: Course[] = [];

  constructor(private helper: HelperService, private http: HttpClient) {}

  getEmptyCourse(): Course {
    const newCourse = {} as Course;
    newCourse.id = this.helper.generateId();
    return newCourse;
  }

  getList(page: number): Observable<Course[]> {
    const params = new HttpParams({ fromObject: { _start: 0, _limit: 10 * page, _sort: '-creationDate' } });
    return this.http.get<Course[]>(`${this.url}/courses`, {params});
  }

  createCourse(newCourse: Course): Observable<Course> {
    return this.http.post<Course>(`${this.url}/courses/`, { ...newCourse });
  }

  getCourseById(id: string | number): Observable<Course> {
    return this.http.get<Course>(`${this.url}/courses/${id}`);
  }

  updateCourse(newCourse: Course): Observable<Course> {
    return this.http.put<Course>(`${this.url}/courses/${newCourse.id}`, {
      ...newCourse,
    });
  }

  removeCourse(course: Course): Observable<Object> {
    return this.http.delete(`${this.url}/courses/${course.id}`);
  }

  getListByTitle(title: string): Observable<Course[]> {
    const params = new HttpParams({ fromObject: { title } });
    return this.http.get<Course[]>(`${this.url}/courses`, { params });
  }
}
