import { Component, OnInit } from '@angular/core';
import { GebruikerService } from '../gebruikers/gebruiker.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Poll } from '../models/poll/poll.model';
import { PollGebruiker } from '../models/poll-gebruiker/poll-gebruiker.model';
import { Antwoord } from '../models/antwoord/antwoord.model';

@Component({
  selector: 'app-poll-form',
  templateUrl: './poll-form.component.html',
  styleUrls: ['./poll-form.component.scss'],
  providers: [GebruikerService]
})
export class PollFormComponent implements OnInit {

  pollForm = this.fb.group({
    naam: ['', Validators.required],
    antwoord1: ['', Validators.required],
    antwoord2: ['', [Validators.required]],
    antwoord3: ['']
  });

  constructor(private router: Router, private fb: FormBuilder, private _gebruikerService: GebruikerService) { }

  ngOnInit() {
  }

  addPoll(){
    let poll = new Poll(0, this.pollForm.get('naam').value);

    this._gebruikerService.addPoll(poll).subscribe(result => {
      poll.pollId = result.pollId;  

      let pollGebruiker = new PollGebruiker(0, poll.pollId, parseInt(localStorage.getItem('gebruikerId')), true);
      this._gebruikerService.addPollGebruiker(pollGebruiker).subscribe();

      let antwoord1 = new Antwoord(0, this.pollForm.get('antwoord1').value, poll.pollId);
      this._gebruikerService.addAntwoord(antwoord1).subscribe();

      let antwoord2 = new Antwoord(0, this.pollForm.get('antwoord2').value, poll.pollId);
      this._gebruikerService.addAntwoord(antwoord2).subscribe();

      if(this.pollForm.get('antwoord3').value != ''){
        let antwoord3 = new Antwoord(0, this.pollForm.get('antwoord3').value, poll.pollId);
        this._gebruikerService.addAntwoord(antwoord3).subscribe();
      }

      localStorage.setItem("pollId", poll.pollId + "");
    });
    this.router.navigate(['/pollForm2']);
  }
}
