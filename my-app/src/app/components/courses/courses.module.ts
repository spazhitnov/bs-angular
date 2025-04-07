import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { FormsModule } from '@angular/forms';
import { CoursesItemComponent } from './courses-item/courses-item.component';
import { CoursesComponent } from './courses.component';
import { CourseParamsComponent } from './course-params/course-params.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesRoutingModule } from './courses-routing.module';

@NgModule({
  declarations: [CoursesComponent],
  imports: [
    CommonModule,
    BreadcrumbModule,
    FormsModule,
    CoursesItemComponent,
    CourseParamsComponent,
    CoursesListComponent,
    CoursesRoutingModule
  ],
})
export class CoursesModule {}
