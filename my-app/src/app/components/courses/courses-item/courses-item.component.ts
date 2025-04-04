import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Course } from 'src/app/models/app.model';
import { ButtonModule } from 'primeng/button';
import { IsnewcourseDirective } from 'src/app/directives/isnewcourse.directive';
import { NgClass } from '@angular/common';
import { DurationPipe } from 'src/app/pipes/duration.pipe';

@Component({
  selector: 'app-courses-item',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    IsnewcourseDirective,
    NgClass,
    DurationPipe,
  ],
  templateUrl: './courses-item.component.html',
  styleUrls: ['./courses-item.component.scss'],
})
export class CoursesItemComponent {
  @Input() course!: Course;
  @Output() change = new EventEmitter<Course>();
  @Output() delete = new EventEmitter<Course>();
}
