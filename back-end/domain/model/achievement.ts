import { Achievement as AchievementPrisma } from "@prisma/client";

export class Achievement{
    private id:number;
    private name:string;
    private description:string;



    constructor(achievement:{id:number; name:string; description:string;}) {
        this.id = achievement.id;
        this.name = achievement.name;
        this.description = achievement.description;

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



    equals(achievement:Achievement){
        return(
            this.id === achievement.getId()&&
            this.name === achievement.getName()&&
            this.description === achievement.getDescription()
        )

    }

    static from( {id, name, description}:AchievementPrisma){
        return new Achievement({id, name, description})
    }
}