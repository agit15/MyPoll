import { Injectable } from '@angular/core';
import { Gebruiker } from '../models/gebruiker/gebruiker.model';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { PollGebruiker } from '../models/poll-gebruiker/poll-gebruiker.model';
import { Poll } from '../models/poll/poll.model';
import { Vriend } from '../models/vriend/vriend.model';
import { Antwoord } from '../models/antwoord/antwoord.model';
import { Stem } from '../models/stem/stem.model';

@Injectable()
export class GebruikerService {

  constructor(private http: HttpClient) { }

  getGebruikers(): Observable<Gebruiker[]> {
    return this.http.get<Gebruiker[]>("https://localhost:44317/api/gebruiker", {
    });
  }

  getPollGebruikerByGebruikerId(gebruikerId: number): Observable<PollGebruiker[]> {
    return this.http.get<PollGebruiker[]>("https://localhost:44317/api/pollgebruiker/gebruiker/" + gebruikerId, {
    });
  }

  getPollById(pollId: number): Observable<Poll> {
    return this.http.get<Poll>("https://localhost:44317/api/Poll/" + pollId,{
    });
  }
  
  getGebruikerById(gebruikerId: number): Observable<Gebruiker> {
    return this.http.get<Gebruiker>("https://localhost:44317/api/gebruiker/" + gebruikerId,{
    });
  }

  addGebruiker(gebruiker: Gebruiker) {
    return this.http.post<Gebruiker>("https://localhost:44317/api/gebruiker", gebruiker);
  }

  addVriend(vriend: Vriend) {
    return this.http.post<Vriend>("https://localhost:44317/api/vriend", vriend);
  }

  addPoll(poll: Poll) {
    return this.http.post<Poll>("https://localhost:44317/api/poll", poll);
  }

  addPollGebruiker(pollGebruiker: PollGebruiker) {
    return this.http.post<PollGebruiker>("https://localhost:44317/api/pollgebruiker", pollGebruiker);
  }
  
  addAntwoord(antwoord: Antwoord) {
    return this.http.post<Antwoord>("https://localhost:44317/api/antwoord", antwoord);
  }
  
  addStem(stem: Stem) {
    return this.http.post<Stem>("https://localhost:44317/api/stem", stem);
  }

  deleteGebruiker(gebruikerId: number) {
    return this.http.delete<Gebruiker>("https://localhost:44317/api/gebruiker/" + gebruikerId);
  }

  getVriendenByOntvangerId(gebruikerId: number): Observable<Vriend[]>{
    return this.http.get<Vriend[]>("https://localhost:44317/api/vriend/gebruiker/" + gebruikerId,{
    }); 
  }
  
  getAntwoordenByPollId(pollId: number): Observable<Antwoord[]>{
    return this.http.get<Antwoord[]>("https://localhost:44317/api/antwoord/poll/" + pollId,{
    }); 
  }
  
  getStemmenByAntwoordId(antwoordId: number): Observable<Stem[]>{
    return this.http.get<Stem[]>("https://localhost:44317/api/stem/antwoord/" + antwoordId,{
    }); 
  }

  updateVriend(vriendId: number, vriend: Vriend) {
    return this.http.put<Vriend>("https://localhost:44317/api/vriend/" + vriendId, vriend);
  }

  deleteVriend(vriendId: number) {
    return this.http.delete<Vriend>("https://localhost:44317/api/vriend/" + vriendId);
  }

  getGebruikerByEmail(email: string): Observable<Gebruiker> {
    return this.http.get<Gebruiker>("https://localhost:44317/api/gebruiker/email/" + email,{
    });
  }

  getVriendenByVerzenderId(verzenderId: number): Observable<Vriend[]> {
    return this.http.get<Vriend[]>("https://localhost:44317/api/vriend/verzender/" + verzenderId,{
    });
  }

  updatePollGebruiker(pollGebruikerId: number, pollGebruiker: PollGebruiker){
    return this.http.put<PollGebruiker>("https://localhost:44317/api/pollgebruiker/" + pollGebruikerId, pollGebruiker);
  }

  deletePollGebruiker(pollGebruikerId: number) {
    return this.http.delete<PollGebruiker>("https://localhost:44317/api/pollgebruiker/" + pollGebruikerId);
  }
}
