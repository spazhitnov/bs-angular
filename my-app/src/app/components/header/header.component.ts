import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../logo/logo.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { Subscription, takeUntil } from 'rxjs';
import { AutoUnsubscribeDirective } from 'src/app/directives/auto-unsubscribe.directive';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LogoComponent, FormsModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent
  extends AutoUnsubscribeDirective
  implements OnInit
{
  @Output() logout = new EventEmitter();
  isAuth!: boolean;
  user!: User;

  constructor(
    private authService: AuthService,
    private helper: HelperService,
    private readonly cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.helper.isAuth$.pipe(takeUntil(this.destroyed$)).subscribe((data) => {
      this.isAuth = data;
    });
    this.authService
      .getUserInfo()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        if (data) {
          if (data) {
            this.user = data;
            this.cdr.detectChanges();
          }
        }
      });
  }

  onLogout(): void {
    this.authService
      .getUserInfo()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        if (data) {
          this.authService.logout();
          console.log(`Выход ${data.email}`);
        }
      });
  }

  getFIO(): string {
    return `${this.user.firstName} ${this.user.lastName}`
  }
}
