import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../logo/logo.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LogoComponent, FormsModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent
  implements
    OnInit,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  ngOnInit(): void {
    console.log('init');
  }

  ngAfterContentChecked(): void {
    console.log('contentChecked');
  }

  ngAfterContentInit(): void {
    console.log('contentInit');
  }

  ngAfterViewChecked(): void {
    console.log('viewChecked');
  }

  ngAfterViewInit(): void {
    console.log('viewInit');
  }

  ngOnDestroy(): void {
    console.log('destroy');
  }
}
