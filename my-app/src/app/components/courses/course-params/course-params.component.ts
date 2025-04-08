import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { takeUntil } from 'rxjs';
import { AutoUnsubscribeDirective } from 'src/app/directives/auto-unsubscribe.directive';

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
export class CourseParamsComponent
  extends AutoUnsubscribeDirective
  implements OnInit
{
  course!: Course;
  isNew!: boolean;

  constructor(
    private coursesService: CoursesService,
    private activeRout: ActivatedRoute,
    private helper: HelperService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    const id = this.activeRout.snapshot.params['id'];
    if (id) {
      this.coursesService
        .getCourseById(id)
        .pipe(takeUntil(this.destroyed$))
        .subscribe((data) => {
          this.course = data;
          this.cdr.detectChanges();
        });
    } else {
      this.isNew = true;
      this.course = this.coursesService.getEmptyCourse();
    }
  }

  onSave(): void {
    if (this.isNew) {
      this.coursesService
        .createCourse(this.course as Course)
        .pipe(takeUntil(this.destroyed$))
        .subscribe((data) => {
          this.onCancel();
        });
    } else {
      this.coursesService
        .updateCourse(this.course as Course)
        .pipe(takeUntil(this.destroyed$))
        .subscribe((data) => {
          this.onCancel();
        });
    }
  }

  onCancel(): void {
    this.helper.menuItem$.next({ routerLink: 'courses/list' });
    this.router.navigate(['courses/list']);
  }
}
