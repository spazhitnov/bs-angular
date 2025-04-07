import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Course } from 'src/app/models/app.model';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { CoursesService } from './courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  searchParam!: string | null;
  items: MenuItem[] = [];
  isParamsVisible!: boolean;
  selectedCourse: Course | null = null;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private coursesService: CoursesService,
    private filterPipe: FilterPipe
  ) {}

  ngOnInit(): void {
    this.courses = this.coursesService.getList();
    this.items = [
      {
        label: 'Курсы',
        icon: 'pi pi-home',
        command: () => {
          this.selectedCourse = null;
          this.isParamsVisible = false;
          this.items = this.items.filter((item) => {
            return item.label === 'Курсы';
          });
          this.items = [...this.items];
        },
      },
    ];
  }

  onSearch(): void {
    this.courses = this.searchParam
      ? this.filterPipe.transform(
          this.coursesService.getList(),
          this.searchParam
        )
      : this.coursesService.getList();
  }

  onAdd(): void {
    const params = this.coursesService.createCourse();
    this.courses = params?.courses;
    this.items.push({
      label: 'Новый курс',
      icon: 'none',
    });
    this.items = [...this.items];
    this.selectedCourse = params?.newCourse;
    this.isParamsVisible = true;
  }

  onChange(course: Course): void {
    console.log(course);
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
        this.courses = this.coursesService.removeCourse(data.course);
        this.messageService.add({
          severity: 'error',
          detail: 'Курс удален',
        });
      },
    });
  }
}
