import { Component, OnInit } from '@angular/core';
import { GebruikerService } from 'src/app/gebruikers/gebruiker.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registreren',
  templateUrl: './registreren.component.html',
  styleUrls: ['./registreren.component.scss'],
  providers: [GebruikerService]
})
export class RegistrerenComponent implements OnInit {
  submitted : boolean = false;

  gebruikerForm = this.fb.group({
    gebruikersnaam: ['', Validators.required],
    email: ['', Validators.required],
    wachtwoord: ['', [Validators.required, Validators.minLength(4)]]
  });

  constructor(private router: Router, private fb: FormBuilder, private _gebruikerService: GebruikerService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.submitted = true;
    this._gebruikerService.addGebruiker(this.gebruikerForm.value).subscribe();
    this.router.navigate(['/']);
  }
}
