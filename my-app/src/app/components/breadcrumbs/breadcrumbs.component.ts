import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { Subscription, takeUntil } from 'rxjs';
import { HelperService } from 'src/app/services/helper.service';
import { AutoUnsubscribeDirective } from 'src/app/directives/auto-unsubscribe.directive';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule, BreadcrumbModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent
  extends AutoUnsubscribeDirective
  implements OnInit
{
  items: MenuItem[] = [
    {
      label: 'Курсы',
      icon: 'pi pi-home',
      routerLink: 'courses/list',
      command: () => {
        this.items = this.items.filter((item) => {
          return item.label === 'Курсы';
        });
        this.items = [...this.items];
      },
    },
  ];
  subs: Subscription[] = [];

  constructor(
    private helper: HelperService,
    private readonly cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.helper.menuItem$.pipe(takeUntil(this.destroyed$)).subscribe((data) => {
      if (data.routerLink === 'courses/list') {
        this.items = this.items.filter((item) => {
          return item.routerLink === 'courses/list';
        });
      } else {
        this.items.push(data);
      }
      this.items = [...this.items];
      this.cdr.detectChanges();
    });
  }
}
