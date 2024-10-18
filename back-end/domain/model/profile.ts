import {User} from "./user";
import {Achievement} from "./achievement";
import {Game} from "./game";

export class Profile{
    private id?:number
    private username:string;
    private pfp: string;
    private user:User;
    private achievements:Achievement[];
    private gamesPlayed: Game[]
    constructor(profile:{id?:number; username:string; pfp:string; user:User; achievements:Achievement[]; gamesPlayed:Game[]}) {
        this.id=profile.id;
        this.username = profile.username;
        this.pfp = profile.pfp;
        this.user = profile.user;
        this.achievements = profile.achievements;
        this.gamesPlayed = profile.gamesPlayed;
    }


    getid(): number|undefined {
        return this.id;
    }

    getusername(): string {
        return this.username;
    }

    getPfp(): string {
        return this.pfp;
    }

    getUser(): User {
        return this.user;
    }
    getAchievements(): Achievement[]{
        return this.achievements
    }

    addAchievement(achievement:Achievement){
        this.achievements.push(achievement)
    }
    getGamesPlayed():Game[]{
        return this.gamesPlayed
    }
    addToGamesPlayed(game:Game){
        this.gamesPlayed.push(game)
    }


    equals(profile:Profile):boolean{
        return (
            this.id === profile.getid()&&
            this.username === profile.getusername()&&
            this.user === profile.getUser()&&
            this.pfp === profile.getPfp()&&
            this.achievements === profile.getAchievements()&&
            this.gamesPlayed === profile.getGamesPlayed()
        )
    }
}