export class Gebruiker {
    constructor(
        public gebruikerId: number, 
        public email: string, 
        public wachtwoord: string, 
        public gebruiksnaam: string,
        public token: string,
        public disabled: boolean,
        public verzondenVerzoeken: Array<any>,
        public ontvangenVerzoeken: Array<any>){
    }
}
