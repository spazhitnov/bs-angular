import { Component, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss'],
})
export class AuthentificationComponent {
  @Output() onLogin = new EventEmitter<Partial<User>>();
  login!: string;
  password!: string;
}
