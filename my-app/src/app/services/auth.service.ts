import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private helper: HelperService) {}

  login(user: Partial<User>): User {
    user.id = this.helper.generateId();
    user.userFIO = 'Никита Удзумаков';
    localStorage.setItem('user', JSON.stringify(user));
    return user as User;
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    const user = localStorage.getItem('user')
    return user ? true : false
  }

  getUserInfo(): string {
    return JSON.parse(localStorage.getItem('user') || '')?.login;
  }
}
