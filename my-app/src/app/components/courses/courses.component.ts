import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CoursesItemComponent } from './courses-item/courses-item.component';
import { Course } from 'src/app/models/app.model';
import { CardModule } from 'primeng/card';
import { OrderByPipe } from 'src/app/pipes/orderBy.pipe';
import { FilterPipe } from 'src/app/pipes/filter.pipe copy';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    CoursesItemComponent,
    CardModule,
    OrderByPipe,
  ],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  providers: [FilterPipe]
})
export class CoursesComponent implements OnInit {
  allCourses: Course[] = [];
  courses: Course[] = [];
  searchParam!: string | null;
  items: MenuItem[] = [{ label: 'Курсы', icon: 'pi pi-home', routerLink: '/' }];

  constructor(private filterPipe: FilterPipe) {}

  ngOnInit(): void {
    this.allCourses = this.courses = [
      {
        id: this.generateId(),
        topRated: Math.random() > 0.5,
        creationDate: this.setRandomDate(),
        title: 'Reprehenderit est veniam elit',
        duration: this.generateDuration(),
        description:
          'Sunt culpa officia minim commodo eiusmod irure sunt nostrud. Mollit aliquip id occaecat officia proident anim dolor officia qui voluptate consectetur laborum. Duis incididunt culpa aliqua mollit do fugiat ea dolor mollit irure Lorem tempor.',
      },
      {
        id: this.generateId(),
        topRated: Math.random() > 0.5,
        creationDate: this.setRandomDate(),
        title: 'Magna Excepteur aute Deserunt',
        duration: this.generateDuration(),
        description:
          'Sunt culpa officia minim commodo eiusmod irure sunt nostrud. Mollit aliquip id occaecat officia proident anim dolor officia qui voluptate consectetur laborum. Duis incididunt culpa aliqua mollit do fugiat ea dolor mollit irure Lorem tempor.',
      },
      {
        id: this.generateId(),
        topRated: Math.random() > 0.5,
        creationDate: this.setRandomDate(),
        title: 'Magna Excepteur aute Deserunt',
        duration: this.generateDuration(),
        description:
          'Est consequat deserunt officia fugiat culpa in aliquip consectetur. Est nostrud occaecat cillum elit officia officia ea magna et minim officia commodo sunt. Deserunt duis minim magna nostrud enim enim commodo sit elit nostrud cillum aliquip est qui.',
      },
      {
        id: this.generateId(),
        topRated: Math.random() > 0.5,
        creationDate: this.setRandomDate(),
        title: 'Sit voluptate eiusmod ea',
        duration: this.generateDuration(),
        description:
          'Commodo id sunt sunt adipisicing et aliquip voluptate laborum consectetur. Occaecat nisi sint exercitation ullamco adipisicing irure est in consectetur aute voluptate. Ea pariatur dolor anim ea reprehenderit ut non occaecat magna adipisicing exercitation nisi consequat.',
      },
      {
        id: this.generateId(),
        topRated: Math.random() > 0.5,
        creationDate: this.setRandomDate(),
        title: 'Duis mollit reprehenderit ad',
        duration: this.generateDuration(),
        description:
          'Est minim ea aute sunt laborum minim eu excepteur. Culpa sint exercitation mollit enim ad culpa aliquip laborum cillum. Dolor officia culpa labore ex eiusmod ut est ea voluptate ea nostrud.',
      },
    ];
  }

  onSearch(): void {
    this.courses = this.allCourses;
    this.courses = this.searchParam ? this.filterPipe.transform(this.courses, this.searchParam) : this.allCourses;
  }

  onAdd(): void {
  }

  generateId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        let r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  generateDuration(): number {
    return +(Math.random() * 1000).toFixed(0);
  }

  onChange(course: Course): void {
    console.log(course);
  }

  onDelete(course: Course): void {
    console.log(course.id);
  }

  setRandomDate(): Date {
    return new Date(
      new Date().setHours(
        new Date().getHours() +
          +((Math.random() < 0.5 ? -1 : 1) * Math.random() * 1000).toFixed(0)
      )
    );
  }
}
