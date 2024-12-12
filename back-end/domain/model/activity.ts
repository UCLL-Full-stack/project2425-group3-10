import { TypeOfActivity } from '../../types';
import { Activity as ActivityPrisma } from '@prisma/client';

export class Activity {
    readonly id: number;
    readonly name: string;
    readonly type: TypeOfActivity;

    constructor(activity: {
        id: number;
        name: string;
        type: TypeOfActivity
    }) {
        this.id = activity.id;
        this.name = activity.name;
        this.type = activity.type;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getType(): TypeOfActivity {
        return this.type;
    }

    equals(activity: Activity): boolean {
        return (
            this.id === activity.getId() &&
            this.name === activity.getName() &&
            this.type === activity.getType()
        );
    }

    static from({ id, name, type }: ActivityPrisma): Activity {
        return new Activity({id, name, type: type as TypeOfActivity });
    }
}