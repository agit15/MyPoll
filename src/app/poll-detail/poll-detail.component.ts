import { Component, OnInit, Input, Output } from '@angular/core';
import { Poll } from '../models/poll/poll.model';
import { Antwoord } from '../models/antwoord/antwoord.model';
import { Stem } from '../models/stem/stem.model';
import { GebruikerService } from '../gebruikers/gebruiker.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poll-detail',
  templateUrl: './poll-detail.component.html',
  styleUrls: ['./poll-detail.component.scss'],
  providers: [GebruikerService]
})
export class PollDetailComponent implements OnInit {
  antwoorden: Antwoord[] = new Array<Antwoord>();
  stemmen: number[] = new Array<number>();
  poll: string;

  constructor(private router: Router, private _gebruikerService: GebruikerService) {
    this._gebruikerService.getAntwoordenByPollId(parseInt(localStorage.getItem('pollId'))).subscribe(result => {
      this.antwoorden = result;
      this.antwoorden.forEach(antwoord => {
        this._gebruikerService.getStemmenByAntwoordId(antwoord.antwoordId).subscribe(result2 => {
          antwoord.stemmen = result2;
        })
      })
    });
    this._gebruikerService.getPollById(parseInt(localStorage.getItem('pollId'))).subscribe(result => {
      this.poll = result.naam;
    });
   }

  ngOnInit() {
  }

  pollDetail(){

  }  
}
