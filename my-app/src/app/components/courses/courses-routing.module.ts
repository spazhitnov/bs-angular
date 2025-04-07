import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseParamsComponent } from './course-params/course-params.component';
import { NoPageComponent } from '../no-page/no-page.component';
import { CoursesComponent } from './courses.component';

const routes: Routes = [
  { path: '', component: CoursesComponent },
  {
    path: 'list',
    component: CoursesListComponent,
  },
  {
    path: 'new',
    component: CourseParamsComponent,
  },
  {
    path: ':id',
    component: CourseParamsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
