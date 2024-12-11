import {Group as GroupPrisma} from "@prisma/client";

export class Group{
    readonly id?:number;
    readonly maxPlayers:number;
    readonly currentPlayers:number;
    readonly name:string

    constructor(group:{id:number; maxPlayers:number; currentPlayers:number; name:string}) {
        this.id = group.id;
        this.name = group.name;
        this.maxPlayers = group.maxPlayers;
        this.currentPlayers = group.currentPlayers;
    }


    getId(): number | undefined {
        return this.id;
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
            this.currentPlayers === group.getCurrentPlayers()
        )
    }
    static from({id, maxPlayers, currentPlayers,name}:GroupPrisma){
        return new Group({id, maxPlayers, currentPlayers, name})
    }
}