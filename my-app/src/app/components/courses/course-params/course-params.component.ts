import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
export class CourseParamsComponent {
  @Input() course!: Course | null;

  onSave(): void {}

  onCancel(): void {}
}
