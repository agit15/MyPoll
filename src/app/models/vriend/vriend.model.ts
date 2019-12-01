import { Gebruiker } from '../gebruiker/gebruiker.model';

export class Vriend {
    constructor(
        public vriendId: number,
        public aanvaard: boolean,
        public verzenderId: number,
        public ontvangerId: number)
    {
    }
    
}
