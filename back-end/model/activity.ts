import {TypeOfActivity} from "../types";


export class Activity{
    private id?:number;
    private name:string;
    private description:string;
    private type:TypeOfActivity;

    constructor(activity:{id:number; name:string; description:string; type:TypeOfActivity}) {
        this.id = activity.id;
        this.name = activity.name;
        this.description = activity.description;
        this.type = activity.type;
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

    equals(activity:Activity){
        return(
            this.id === activity.getId()&&
                this.name === activity.getName()&&
                this.description === activity.getDescription()&&
                this.type === activity.getType()
        )
    }
}