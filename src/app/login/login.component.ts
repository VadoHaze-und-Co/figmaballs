import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public errorMessage: string;

  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {
    this.errorMessage = '';
  }


  login() {
    // Hier kannst du die Logik für das Login implementieren, z.B. eine HTTP-Anfrage an einen Server senden
    const loginUrl = 'http://localhost:4200/Login';

    const body = {
      username: this.username,
      password: this.password
    };


    this.http.post(loginUrl, body).subscribe(
      (response) => {
        // Erfolgreiche Antwort vom Server
        console.log('Erfolgreich eingeloggt:', response);
        // Hier könntest du eine Weiterleitung oder andere Aktionen durchführen
        this.router.navigate(['/homepage']);
      },
      (error) => {
        // Fehler beim Anmelden
        console.error('Fehler beim Einloggen:', error);
        // Hier könntest du eine Fehlermeldung für den Benutzer anzeigen
        this.errorMessage = 'Fehler beim Einloggen: Bitte überprüfen Sie Ihre Anmeldeinformationen und versuchen Sie es erneut.';
      }
    );
  }

}
