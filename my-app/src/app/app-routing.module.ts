import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CoursesListComponent } from './components/courses/courses-list/courses-list.component';
import { CourseParamsComponent } from './components/courses/course-params/course-params.component';
import { NoPageComponent } from './components/no-page/no-page.component';
import { provideGuardForPermission } from './services/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthentificationComponent,
  },
  {
    path: 'courses',
    loadChildren: () => import('./components/courses/courses.module').then(mod => mod.CoursesModule),
    canActivate: [provideGuardForPermission()],
    canActivateChild: [provideGuardForPermission()],
  },
  { path: '', pathMatch: 'full', redirectTo: 'auth' },
  { path: '**', component: NoPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
