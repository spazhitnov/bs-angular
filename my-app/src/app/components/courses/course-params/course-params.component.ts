import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from 'src/app/models/app.model';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DurationComponent } from './duration/duration.component';
import { CalendarModule } from 'primeng/calendar';
import { AppLocalizedCalendarDirective } from 'src/app/directives/p-calendar-locale.directive';
import { AuthorsComponent } from './authors/authors.component';
import { CoursesService } from '../courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-course-params',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    InputTextareaModule,
    DurationComponent,
    CalendarModule,
    AppLocalizedCalendarDirective,
    AuthorsComponent,
  ],
  templateUrl: './course-params.component.html',
  styleUrls: ['./course-params.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseParamsComponent implements OnInit {
  course!: Course | null;

  constructor(
    private coursesService: CoursesService,
    private activeRout: ActivatedRoute,
    private helper: HelperService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activeRout.snapshot.params['id'];
    this.course = id
      ? this.coursesService.getCourseById(id)
      : this.coursesService.createCourse();
  }

  onSave(): void {
    this.coursesService.updateCourse(this.course);
    this.onCancel();
  }

  onCancel(): void {
    this.helper.menuItem$.next({ routerLink: 'courses/list' });
    this.router.navigate(['courses/list']);
  }
}
