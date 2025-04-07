import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../logo/logo.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LogoComponent, FormsModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() isAuth!: boolean;
  @Output() logout = new EventEmitter();

  constructor(private authService: AuthService, private router: Router) {}

  onLogout(): void {
    const login = this.authService.getUserInfo();
    this.authService.logout();
    console.log(`Выход ${login}`)
  }
}
