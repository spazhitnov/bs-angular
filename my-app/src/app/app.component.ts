import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  forChanges: number = 0;
  isAuth!: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.router.navigate([''])
  }

  onLogin(params: Partial<User>): void {
    this.authService.login(params);
    this.isAuth = this.authService.isAuthenticated();
    this.router.navigate(['main']);
  }

  onLogout(): void {
    this.router.navigate(['']);
    this.isAuth = this.authService.isAuthenticated();
  }

  ngOnDestroy(): void {
    localStorage.clear()
  }
}
