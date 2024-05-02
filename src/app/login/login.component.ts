import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  //username: string;
  //password: string;

  constructor() { }

  login() {
    // Hier kannst du die Logik für das Login implementieren, z.B. eine HTTP-Anfrage an einen Server senden
    //console.log('Benutzername:', this.username);
    //console.log('Passwort:', this.password);
  }

}
