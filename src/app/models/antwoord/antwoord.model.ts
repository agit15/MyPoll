import { Stem } from '../stem/stem.model';

export class Antwoord {
    constructor(
        public antwoordId: number, 
        public naam: string, 
        public pollId: number,
        public stemmen?: Array<Stem>)
    {
    }
}
