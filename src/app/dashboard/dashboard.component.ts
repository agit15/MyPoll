import { Component, OnInit, Input } from '@angular/core';
import { GebruikerService } from '../gebruikers/gebruiker.service';
import { Poll } from '../models/poll/poll.model';
import { Gebruiker } from '../models/gebruiker/gebruiker.model';
import { Vriend } from '../models/vriend/vriend.model';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Antwoord } from '../models/antwoord/antwoord.model';
import { Stem } from '../models/stem/stem.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [GebruikerService]
})
export class DashboardComponent implements OnInit {
  pollGebruikers: any
  polls: Poll[] = new Array<Poll>();
  uitgenodigdePolls: Poll[] = new Array<Poll>();
  verzoeken: any;
  gebruikers: Gebruiker[] = new Array<Gebruiker>();
  vrienden: Gebruiker[] = new Array<Gebruiker>();
  acceptedVrienden: Vriend[] = new Array<Vriend>();
  gebruiker: Gebruiker;
  selectedPoll: Poll = null;
  antwoorden: Antwoord[] = new Array<Antwoord>();
  stemmen: number[] = new Array<number>();

  verzoekForm = this.fb.group({
    email: ['', Validators.required]
  });

  constructor(private router: Router, private _gebruikerService: GebruikerService, private fb: FormBuilder) { 

    //Lijst tonen van polls dat geaccepteerd zijn
    this._gebruikerService.getPollGebruikerByGebruikerId(parseInt(localStorage.getItem('gebruikerId'))).subscribe(result => {
      this.pollGebruikers = result;
      this.pollGebruikers.forEach(gebruiker => {
        this._gebruikerService.getPollById(gebruiker.pollId).subscribe(result2 => {
          
          if(gebruiker.aanvaard == true){
            this.polls.push(result2);
          }
      })
      });
    });

    //Lijst tonen van uitgenodigde polls
    this._gebruikerService.getPollGebruikerByGebruikerId(parseInt(localStorage.getItem('gebruikerId'))).subscribe(result => {
      this.pollGebruikers = result;
      this.pollGebruikers.forEach(gebruiker => {
        this._gebruikerService.getPollById(gebruiker.pollId).subscribe(result2 => {
        if(gebruiker.aanvaard == false){
          this.uitgenodigdePolls.push(result2);
        }
      })
      });
    });

    //Lijst van ontvangen vriendschapverzoeken tonen
    this._gebruikerService.getVriendenByOntvangerId(parseInt(localStorage.getItem('gebruikerId'))).subscribe(result => {
      this.verzoeken = result;
      this.verzoeken.forEach(verzoek => {
        this._gebruikerService.getGebruikerById(verzoek.verzenderId).subscribe(result2 => {
        if(verzoek.aanvaard == false){
          this.gebruikers.push(result2);
        }
      })
      });
    });

    //Lijst geaccepteerde vrienden tonen
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

  addVriend(gebruiker: Gebruiker){
      console.log(this.verzoeken);
      this.verzoeken.forEach(verzoek => {
        if(verzoek.verzenderId == gebruiker.gebruikerId){
          verzoek.aanvaard = true;
          this._gebruikerService.updateVriend(verzoek.vriendId, verzoek).subscribe();
        }     
      });
    this.router.navigate(['/dashboard']);
  }

  deleteVriend(gebruiker: Gebruiker){
      this.verzoeken.forEach(verzoek => {
        if(verzoek.verzenderId == gebruiker.gebruikerId){
          this._gebruikerService.deleteVriend(verzoek.vriendId).subscribe();
        }
      });
  }

  onSubmit(){
    this._gebruikerService.getGebruikerByEmail(this.verzoekForm.get('email').value).subscribe(result => {
      this.gebruiker = result;
      let verzoek = new Vriend(0, false, parseInt(localStorage.getItem('gebruikerId')), this.gebruiker.gebruikerId);
      this._gebruikerService.addVriend(verzoek).subscribe();
   });
  }

  acceptPoll(poll: Poll){
    this.pollGebruikers.forEach(gebruiker => {
      if(gebruiker.pollId == poll.pollId){
        console.log(gebruiker);
        gebruiker.aanvaard = true;
        console.log(gebruiker);
        this._gebruikerService.updatePollGebruiker(gebruiker.pollGebruikerId, gebruiker).subscribe();
      }
    });
  }

  deletePoll(poll: Poll){
    this.pollGebruikers.forEach(gebruiker => {
      if(gebruiker.pollId == poll.pollId){
        this._gebruikerService.deletePollGebruiker(gebruiker.pollGebruikerId).subscribe();
      }
    });
  }

  pollAanmaken(){
    this.router.navigate(['/pollForm']);
  }

  pollStemmen(p: Poll){
    localStorage.setItem('pollId', p.pollId + "");
    this.router.navigate(['/pollStemmen']);
  }

  pollDetail(p: Poll){
    localStorage.setItem('pollId', p.pollId + "");
    this.router.navigate(['/pollDetail']);
  }
}
