import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { AppRoutingModule } from './app-routing.module';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { CoursesModule } from './components/courses/courses.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthentificationModule } from './components/authentification/authentification.module';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';

registerLocaleData(localeRu);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    CoursesModule,
    BrowserAnimationsModule,
    AuthentificationModule,
    BreadcrumbsComponent
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ru' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
