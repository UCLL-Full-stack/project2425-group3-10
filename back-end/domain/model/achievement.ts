export class Achievement{
    private id:number;
    private name:string;
    private description:string;
    private achievedDate:Date;
    private earned:boolean;


    constructor(achievement:{id:number; name:string; description:string; achievedDate:Date; earned:boolean}) {
        this.id = achievement.id;
        this.name = achievement.name;
        this.description = achievement.description;
        this.achievedDate = achievement.achievedDate;
        this.earned = achievement.earned;
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

    getAchievedDate(): Date {
        return this.achievedDate;
    }

    getEarned(): boolean {
        return this.earned;
    }


    equals(achievement:Achievement){
        return(
            this.id === achievement.getId()&&
            this.name === achievement.getName()&&
            this.earned === achievement.getEarned()&&
            this.achievedDate === achievement.getAchievedDate()&&
            this.description === achievement.getDescription()
        )

    }
}