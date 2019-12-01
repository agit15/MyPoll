import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GebruikerLogin } from 'src/app/models/gebruiker/gebruiker-login.model';
import { Gebruiker } from 'src/app/models/gebruiker/gebruiker.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  constructor(private _httpClient: HttpClient) { }

  isLoggedIn() {
    if(localStorage.getItem("token")) {
      return true;
    } else {
      return false;
    }
  }

  authenticate(gebruikerLogin: GebruikerLogin): Observable<Gebruiker> {
    return this._httpClient.post<Gebruiker>("https://localhost:44317/api/Gebruiker/authenticate", gebruikerLogin);
  }
}
