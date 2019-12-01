import { Poll } from '../poll/poll.model';
import { Gebruiker } from '../gebruiker/gebruiker.model';

export class PollGebruiker {
    constructor(
        public pollGebruikerId: number, 
        public pollId: number, 
        public gebruikerId: number,
        public aanvaard: boolean)
    {
    }
}
