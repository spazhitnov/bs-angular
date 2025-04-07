import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Course } from 'src/app/models/app.model';
import { HelperService } from 'src/app/services/helper.service';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  courses: Course[] = [
    {
      id: this.helper.generateId(),
      topRated: Math.random() > 0.5,
      creationDate: this.helper.setRandomDate(),
      title: 'Reprehenderit est veniam elit',
      duration: this.helper.generateDuration(),
      description:
        'Sunt culpa officia minim commodo eiusmod irure sunt nostrud. Mollit aliquip id occaecat officia proident anim dolor officia qui voluptate consectetur laborum. Duis incididunt culpa aliqua mollit do fugiat ea dolor mollit irure Lorem tempor.',
    },
    {
      id: this.helper.generateId(),
      topRated: Math.random() > 0.5,
      creationDate: this.helper.setRandomDate(),
      title: 'Magna Excepteur aute Deserunt',
      duration: this.helper.generateDuration(),
      description:
        'Sunt culpa officia minim commodo eiusmod irure sunt nostrud. Mollit aliquip id occaecat officia proident anim dolor officia qui voluptate consectetur laborum. Duis incididunt culpa aliqua mollit do fugiat ea dolor mollit irure Lorem tempor.',
    },
    {
      id: this.helper.generateId(),
      topRated: Math.random() > 0.5,
      creationDate: this.helper.setRandomDate(),
      title: 'Magna Excepteur aute Deserunt',
      duration: this.helper.generateDuration(),
      description:
        'Est consequat deserunt officia fugiat culpa in aliquip consectetur. Est nostrud occaecat cillum elit officia officia ea magna et minim officia commodo sunt. Deserunt duis minim magna nostrud enim enim commodo sit elit nostrud cillum aliquip est qui.',
    },
    {
      id: this.helper.generateId(),
      topRated: Math.random() > 0.5,
      creationDate: this.helper.setRandomDate(),
      title: 'Sit voluptate eiusmod ea',
      duration: this.helper.generateDuration(),
      description:
        'Commodo id sunt sunt adipisicing et aliquip voluptate laborum consectetur. Occaecat nisi sint exercitation ullamco adipisicing irure est in consectetur aute voluptate. Ea pariatur dolor anim ea reprehenderit ut non occaecat magna adipisicing exercitation nisi consequat.',
    },
    {
      id: this.helper.generateId(),
      topRated: Math.random() > 0.5,
      creationDate: this.helper.setRandomDate(),
      title: 'Duis mollit reprehenderit ad',
      duration: this.helper.generateDuration(),
      description:
        'Est minim ea aute sunt laborum minim eu excepteur. Culpa sint exercitation mollit enim ad culpa aliquip laborum cillum. Dolor officia culpa labore ex eiusmod ut est ea voluptate ea nostrud.',
    },
  ];

  constructor(private helper: HelperService) {}

  getList(): Course[] {
    return this.courses;
  }

  createCourse(): {courses: Course[], newCourse: Course} {
    const newCourse = {} as Course
    newCourse.id = this.helper.generateId();
    this.courses.push(newCourse);
    return {courses: this.courses, newCourse};
  }

  getCourseById(id: string): Course | null {
    return (
      this.courses.find((item) => {
        return item.id === id;
      }) || null
    );
  }

  updateCourse(newCourse: Course): Course[] {
    let course = this.getCourseById(newCourse.id);
    if (course) {
      course = newCourse;
    }
    return this.courses;
  }

  removeCourse(course: Course): Course[] {
    this.courses = this.courses.filter((item) => {
      return item.id !== course.id;
    });
    return this.courses;
  }

  
}
