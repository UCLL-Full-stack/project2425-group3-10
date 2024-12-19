import { Group as GroupPrisma } from '@prisma/client';

export class Group {
    readonly id?: number;
    readonly maxPlayers: number;
    readonly currentPlayers: number;
    readonly name: string;
    readonly activityId: number;

    constructor(group: { id?: number; maxPlayers: number; currentPlayers: number; name: string; activityId: number }) {
        this.id = group.id;
        this.name = group.name;
        this.maxPlayers = group.maxPlayers;
        this.currentPlayers = group.currentPlayers;
        this.activityId = group.activityId;
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

    getActivityId(): number {
        return this.activityId;
    }

    equals(group: Group): boolean {
        return (
            this.id === group.getId() &&
            this.name === group.getName() &&
            this.maxPlayers === group.getMaxPlayers() &&
            this.currentPlayers === group.getCurrentPlayers() &&
            this.activityId === group.getActivityId()
        );
    }

    static from({ id, maxPlayers, currentPlayers, name, activityId }: GroupPrisma): Group {
        return new Group({ id, maxPlayers, currentPlayers, name, activityId });
    }
}