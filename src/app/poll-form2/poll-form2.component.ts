import { Component, OnInit } from '@angular/core';
import { GebruikerService } from '../gebruikers/gebruiker.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Gebruiker } from '../models/gebruiker/gebruiker.model';
import { PollGebruiker } from '../models/poll-gebruiker/poll-gebruiker.model';

@Component({
  selector: 'app-poll-form2',
  templateUrl: './poll-form2.component.html',
  styleUrls: ['./poll-form2.component.scss'],
  providers: [GebruikerService]
})
export class PollForm2Component implements OnInit {
  verzoeken: any;
  vrienden: Gebruiker[] = new Array<Gebruiker>();
  verderGaan: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private _gebruikerService: GebruikerService) {
    this._gebruikerService.getVriendenByVerzenderId(parseInt(localStorage.getItem('gebruikerId'))).subscribe(result => {
      this.verzoeken = result;
      this.verzoeken.forEach(verzoek => {
        this._gebruikerService.getGebruikerById(verzoek.ontvangerId).subscribe(result2 => {
        if(verzoek.aanvaard == true){
          this.vrienden.push(result2);
        }
      })
      });
    });
    this._gebruikerService.getVriendenByOntvangerId(parseInt(localStorage.getItem('gebruikerId'))).subscribe(result => {
      this.verzoeken = result;
      this.verzoeken.forEach(verzoek => {
        this._gebruikerService.getGebruikerById(verzoek.verzenderId).subscribe(result2 => {
        if(verzoek.aanvaard == true){
          this.vrienden.push(result2);
        }
      })
      });
    });
   }

  ngOnInit() {
  }

  vriendUitnodigen(vriend: Gebruiker){
    let pollGebruiker = new PollGebruiker(0, parseInt(localStorage.getItem('pollId')), vriend.gebruikerId, false);
    this._gebruikerService.addPollGebruiker(pollGebruiker).subscribe();
    vriend.disabled = true;
    this.verderGaan = true;
  }

  naarDashboard(){
    this.router.navigate(['/dashboard']);
  }
}
