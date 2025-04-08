import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(userForm: Partial<User>): Observable<User | null> {
    const params = new HttpParams({
      fromObject: { email: userForm.email || '' },
    });
    return this.http.get<User[]>(`${this.url}/users`, { params }).pipe(
      map((data: User[]) => {
        for (const user of data) {
          if (userForm.password === user.password) {
            localStorage.setItem('user', user.fakeToken);
            return user;
          }
        }
        return null;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    const user = localStorage.getItem('user');
    return user ? true : false;
  }

  getUserInfo(): Observable<User | null> {
    const params = new HttpParams({
      fromObject: { fakeToken: localStorage.getItem('user') || '' },
    });
    return this.http.get<User[]>(`${this.url}/users`, { params }).pipe(
      map((data: User[]) => {
        return data?.length > 0 ? data[0] : null;
      })
    );
  }
}
