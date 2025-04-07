import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CoursesItemComponent } from './courses-item/courses-item.component';
import { CardModule } from 'primeng/card';
import { OrderByPipe } from 'src/app/pipes/orderBy.pipe';
import { CoursesComponent } from './courses.component';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { CoursesService } from './courses.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [CoursesComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BreadcrumbModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    CoursesItemComponent,
    CardModule,
    OrderByPipe,
    ConfirmDialogModule,
  ],
  providers: [CoursesService, FilterPipe, ConfirmationService, MessageService]
})
export class CoursesModule {}
