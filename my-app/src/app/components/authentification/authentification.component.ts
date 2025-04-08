import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { AutoUnsubscribeDirective } from 'src/app/directives/auto-unsubscribe.directive';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss'],
})
export class AuthentificationComponent extends AutoUnsubscribeDirective {
  email!: string;
  password!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private helper: HelperService
  ) {
    super();
  }

  onLogin(): void {
    this.authService
      .login({ email: this.email, password: this.password })
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: User | null) => {
        if (data) {
          this.helper.isAuth$.next(this.authService.isAuthenticated());
          this.router.navigate(['courses/list']);
        }
      });
  }
}
