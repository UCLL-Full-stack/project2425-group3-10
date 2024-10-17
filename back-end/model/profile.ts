import {User} from "./user";

export class Profile{
    private id?:number
    private username:string;
    private pfp: string;
    private user:User;
    constructor(profile:{id?:number; username:string; pfp:string; user:User}) {
        this.id=profile.id;
        this.username = profile.username;
        this.pfp = profile.pfp;
        this.user = profile.user;
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

    equals(profile:Profile):boolean{
        return (
            this.id === profile.getid()&&
            this.username === profile.getusername()&&
            this.user === profile.getUser()
        )
    }
}