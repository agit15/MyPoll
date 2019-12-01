import { Component, OnInit } from '@angular/core';
import { GebruikerService } from '../gebruikers/gebruiker.service';
import { Router } from '@angular/router';
import { Antwoord } from '../models/antwoord/antwoord.model';
import { Poll } from '../models/poll/poll.model';
import { Observable } from 'rxjs/internal/Observable';
import { Stem } from '../models/stem/stem.model';

@Component({
  selector: 'app-poll-stemmen',
  templateUrl: './poll-stemmen.component.html',
  styleUrls: ['./poll-stemmen.component.scss'],
  providers: [GebruikerService]
})
export class PollStemmenComponent implements OnInit {
  antwoorden: Antwoord[] = new Array<Antwoord>();
  poll: string;

  constructor(private router: Router, private _gebruikerService: GebruikerService) { 
    this._gebruikerService.getAntwoordenByPollId(parseInt(localStorage.getItem('pollId'))).subscribe(result => {
      this.antwoorden = result;
    });
    this._gebruikerService.getPollById(parseInt(localStorage.getItem('pollId'))).subscribe(result => {
      this.poll = result.naam;
    });
  }

  ngOnInit() {
  }

  stem(a: Antwoord){
    let stem = new Stem(0, a.antwoordId, parseInt(localStorage.getItem('gebruikerId')));
    this._gebruikerService.addStem(stem).subscribe();
    this.router.navigate(['/dashboard']);
  }
}
