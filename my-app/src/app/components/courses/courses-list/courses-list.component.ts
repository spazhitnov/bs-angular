import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesService } from '../courses.service';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CoursesItemComponent } from '../courses-item/courses-item.component';
import { CardModule } from 'primeng/card';
import { OrderByPipe } from 'src/app/pipes/orderBy.pipe';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Course } from 'src/app/models/app.model';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { takeUntil } from 'rxjs';
import { AutoUnsubscribeDirective } from 'src/app/directives/auto-unsubscribe.directive';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    CoursesItemComponent,
    CardModule,
    OrderByPipe,
    ConfirmDialogModule,
  ],
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FilterPipe, ConfirmationService, MessageService],
})
export class CoursesListComponent
  extends AutoUnsubscribeDirective
  implements OnInit
{
  courses: Course[] = [];
  searchParam!: string | null;
  isParamsVisible!: boolean;
  selectedCourse: Course | null = null;
  page = 1;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private coursesService: CoursesService,
    private helper: HelperService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void {
    this.coursesService
      .getList(this.page)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.courses = data;
        this.cdr.detectChanges();
      });
  }

  onSearch(): void {
    if (this.searchParam) {
      this.coursesService
        .getListByTitle(this.searchParam)
        .pipe(takeUntil(this.destroyed$))
        .subscribe((data) => {
          this.courses = data;
          this.cdr.detectChanges();
        });
    } else {
      this.getCourses();
    }

    // this.courses = this.searchParam
    //   ? this.filterPipe.transform(
    //       this.coursesService.getList(),
    //       this.searchParam
    //     )
    //   : this.coursesService.getList();
  }

  onAdd(): void {
    this.router.navigate(['courses/new']);
    this.helper.menuItem$.next({
      label: 'Новый курс',
      icon: 'none',
    });
  }

  onChange(course: Course): void {
    this.router.navigate([`courses/${course.id}`]);
    this.helper.menuItem$.next({
      label: course.title,
      icon: 'none',
    });
  }

  onDelete(data: { event: Event; course: Course }): void {
    this.confirmationService.confirm({
      target: data.event.target as EventTarget,
      message: 'Вы действительно хотите удалить этот курс?',
      header: 'Удалить курс?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-sm p-button-danger',
      rejectButtonStyleClass: 'p-button-sm p-button-text p-button-text',
      acceptLabel: 'Удалить',
      rejectLabel: 'Отмена',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.deleteCourse(data.course);
      },
    });
  }

  onLoad(): void {
    this.page += 1;
    this.getCourses();
  }

  deleteCourse(course: Course): void {
    this.coursesService
      .removeCourse(course)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.messageService.add({
          severity: 'error',
          detail: 'Курс удален',
        });
        this.getCourses();
      });
  }
}
