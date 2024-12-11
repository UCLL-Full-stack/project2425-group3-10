import {TypeOfActivity} from "../../types";
import {Game} from "./game";


export class Activity{
    private id?:number;
    private name:string;
    private description:string;
    private type:TypeOfActivity;
    private game:Game

    constructor(activity:{id:number; name:string; description:string; type:TypeOfActivity; game:Game}) {
        this.id = activity.id;
        this.name = activity.name;
        this.description = activity.description;
        this.type = activity.type;
        this.game = activity.game;
    }


    getId(): number|undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }

    getType(): TypeOfActivity {
        return this.type;
    }
    getGame(): Game{
        return this.game
    }

    equals(activity:Activity){
        return(
            this.id === activity.getId()&&
                this.name === activity.getName()&&
                this.description === activity.getDescription()&&
                this.type === activity.getType()&&
                this.game === activity.getGame()
        )
    }

    from(activity:Activity){
        this.id = activity.getId();
        this.name = activity.getName();
        this.description = activity.getDescription();
        this.type = activity.getType();
        this.game = activity.getGame();
    }
}