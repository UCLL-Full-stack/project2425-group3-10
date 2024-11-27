import {User} from "./user";
import {Activity} from "./activity";

export class Group{
    private id?:number;
    private maxPlayers:number;
    private currentPlayers:number;
    private name:string
    private usersInGroup: User[];
    private activity: Activity;

    constructor(activity:{id:number; maxPlayers:number; currentPlayers:number; name:string; usersInGroup:User[]; activity:Activity}) {
        this.id = activity.id;
        this.name = activity.name;
        this.maxPlayers = activity.maxPlayers;
        this.currentPlayers = activity.currentPlayers;
        this.usersInGroup = activity.usersInGroup;
        this.activity = activity.activity;
    }


    getId(): number | undefined {
        return this.id;
    }

    getPlayersInGroup():User[]{
        return this.usersInGroup
    }

    getMaxPlayers(): number {
        return this.maxPlayers;
    }

    getCurrentPlayers(): number {
        return this.currentPlayers;
    }

    getName(): string {
        return this.name;
    }

    equals(group:Group):boolean{
        return (
            this.id === group.getId()&&
            this.name === group.getName()&&
            this.maxPlayers === group.getMaxPlayers()&&
            this.currentPlayers === group.getCurrentPlayers()&&
            this.usersInGroup === group.getPlayersInGroup()
        )
    }
}