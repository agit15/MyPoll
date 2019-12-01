import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../services/authenticate.service';
import { GebruikerLogin } from 'src/app/models/gebruiker/gebruiker-login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {
  gebruikerLogin: GebruikerLogin = new GebruikerLogin('', '');
  gebruikerId: number

  constructor(private _authenticateService: AuthenticateService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this._authenticateService.authenticate(this.gebruikerLogin).subscribe(result => {
      localStorage.setItem("token", result.token);
      localStorage.setItem("gebruikerId", result.gebruikerId + "");
      this.router.navigate(['/dashboard']);
    });
  }

  onLogOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('gebruikerId');
  }

  toRegistreren(){
    this.router.navigate(['/registreren']);
  }
}
