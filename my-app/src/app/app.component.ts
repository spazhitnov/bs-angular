import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from './services/helper.service';
import { Subscription, takeUntil } from 'rxjs';
import { AutoUnsubscribeDirective } from './directives/auto-unsubscribe.directive';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends AutoUnsubscribeDirective implements OnInit {
  forChanges: number = 0;
  isAuth!: boolean;
  subs: Subscription[] = [];

  constructor(
    private router: Router,
    private helper: HelperService,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit(): void {
    this.router.navigate(['']);
      this.helper.isAuth$.pipe(takeUntil(this.destroyed$)).subscribe((data) => {
        this.isAuth = data;
      })
  }

  onLogout(): void {
    this.authService.logout();
    this.helper.isAuth$.next(false);
    this.router.navigate(['']);
  }
}
