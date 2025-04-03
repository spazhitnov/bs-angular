import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CoursesItemComponent } from './courses-item/courses-item.component';
import { Course } from 'src/app/models/app.model';

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
  ],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  searchParam!: string | null;
  items: MenuItem[] = [{ label: 'Курсы', icon: 'pi pi-home', routerLink: '/' }];

  ngOnInit(): void {
    this.courses = [
      {
        id: this.generateId(),
        creationDate: new Date(),
        title: 'Reprehenderit est veniam elit',
        duration: this.generateDuration(),
        description:
          'Sunt culpa officia minim commodo eiusmod irure sunt nostrud. Mollit aliquip id occaecat officia proident anim dolor officia qui voluptate consectetur laborum. Duis incididunt culpa aliqua mollit do fugiat ea dolor mollit irure Lorem tempor.',
      },
      {
        id: this.generateId(),
        creationDate: new Date(),
        title: 'Мagna Excepteur aute Deserunt',
        duration: this.generateDuration(),
        description:
          'Sunt culpa officia minim commodo eiusmod irure sunt nostrud. Mollit aliquip id occaecat officia proident anim dolor officia qui voluptate consectetur laborum. Duis incididunt culpa aliqua mollit do fugiat ea dolor mollit irure Lorem tempor.',
      },
      {
        id: this.generateId(),
        creationDate: new Date(),
        title: 'Мagna Excepteur aute Deserunt',
        duration: this.generateDuration(),
        description:
          'Est consequat deserunt officia fugiat culpa in aliquip consectetur. Est nostrud occaecat cillum elit officia officia ea magna et minim officia commodo sunt. Deserunt duis minim magna nostrud enim enim commodo sit elit nostrud cillum aliquip est qui.',
      },
      {
        id: this.generateId(),
        creationDate: new Date(),
        title: 'Sit voluptate eiusmod ea',
        duration: this.generateDuration(),
        description:
          'Commodo id sunt sunt adipisicing et aliquip voluptate laborum consectetur. Occaecat nisi sint exercitation ullamco adipisicing irure est in consectetur aute voluptate. Ea pariatur dolor anim ea reprehenderit ut non occaecat magna adipisicing exercitation nisi consequat.',
      },
      {
        id: this.generateId(),
        creationDate: new Date(),
        title: 'Duis mollit reprehenderit ad',
        duration: this.generateDuration(),
        description:
          'Est minim ea aute sunt laborum minim eu excepteur. Culpa sint exercitation mollit enim ad culpa aliquip laborum cillum. Dolor officia culpa labore ex eiusmod ut est ea voluptate ea nostrud.',
      },
    ];
  }

  onSearch(): void {
    console.log(this.searchParam);
    this.searchParam = null;
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
}
