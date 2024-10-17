export class Group{
    private id?:number;
    private maxPlayers:number;
    private currentPlayers:number;
    private name:string

    constructor(game:{id:number; maxPlayers:number; currentPlayers:number; name:string}) {
        this.id = game.id;
        this.name = game.name;
        this.maxPlayers = game.maxPlayers;
        this.currentPlayers = game.currentPlayers;
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
}