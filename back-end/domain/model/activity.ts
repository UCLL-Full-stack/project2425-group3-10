import { TypeOfActivity } from '../../types';
import { Activity as ActivityPrisma } from '@prisma/client';

export class Activity {
    readonly id: number;
    readonly name: string;
    readonly type: TypeOfActivity;
    readonly gameId: number;

    constructor(activity: {
        id: number;
        name: string;
        type: TypeOfActivity;
        gameId: number;
    }) {
        this.id = activity.id;
        this.name = activity.name;
        this.type = activity.type;
        this.gameId = activity.gameId;
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

    getGameId(): number { // Adjusted to handle undefined
        return this.gameId;
    }

    equals(activity: Activity): boolean {
        return (
            this.id === activity.getId() &&
            this.name === activity.getName() &&
            this.type === activity.getType() &&
            this.gameId === activity.getGameId() // Handles undefined
        );
    }

    static from({ id, name, type, gameId }: ActivityPrisma): Activity {
        return new Activity({ id, name, type: type as TypeOfActivity, gameId }); // Supports undefined gameId
    }
}
