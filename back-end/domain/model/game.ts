import {Genre} from "../../types";
import {Game as GamePrisma} from '@prisma/client';

export class Game{
    private id?:number;
    private name:string;
    private genre: Genre;
    private logo : string;

    constructor(game:{id:number; name:string; genre:Genre; logo:string}) {
        this.id = game.id;
        this.genre = game.genre;
        this.name = game.name;
        this.logo = game.logo
    }

    getId(): number|undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getGenre(): Genre {
        return this.genre;
    }

    getLogo(): string {
        return this.logo;
    }

    equal(game:Game):boolean{
        return (
            this.id === game.getId()&&
                this.name === game.getName()
        )
    }
    static from({id, name, genre, logo}:GamePrisma):Game{
        return new Game({id, name, genre: genre as Genre, logo})
    }
}