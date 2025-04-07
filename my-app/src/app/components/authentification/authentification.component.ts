import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss'],
})
export class AuthentificationComponent {
  login!: string;
  password!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private helper: HelperService
  ) {}

  onLogin(): void {
    this.authService.login({ login: this.login, password: this.password });
    this.helper.isAuth$.next(this.authService.isAuthenticated());
    this.router.navigate(['courses/list']);
  }
}
