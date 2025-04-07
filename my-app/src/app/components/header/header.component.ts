import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../logo/logo.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { Subscription, takeUntil } from 'rxjs';
import { AutoUnsubscribeDirective } from 'src/app/directives/auto-unsubscribe.directive';

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
  subs: Subscription[] = [];

  constructor(private authService: AuthService, private helper: HelperService) {
    super();
  }

  ngOnInit(): void {
    this.subs.push(
      this.helper.isAuth$.pipe(takeUntil(this.destroyed$)).subscribe((data) => {
        this.isAuth = data;
      })
    );
  }

  onLogout(): void {
    const login = this.authService.getUserInfo();
    this.authService.logout();
    console.log(`Выход ${login}`);
  }
}
