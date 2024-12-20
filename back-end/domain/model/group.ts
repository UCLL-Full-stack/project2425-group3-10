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

        this.validate();
    }

    private validate(): void {
        this.validateName();
        this.validateMaxPlayers();
        this.validateCurrentPlayers();
        this.validateActivityId();
    }

    private validateName(): void {
        if (!this.name || this.name.trim().length === 0) {
            throw new Error('Group name cannot be empty.');
        }
    }

    private validateMaxPlayers(): void {
        if (this.maxPlayers <= 0) {
            throw new Error('Max players must be greater than 0.');
        }
    }

    private validateCurrentPlayers(): void {
        if (this.currentPlayers < 0 || this.currentPlayers > this.maxPlayers) {
            throw new Error('Current players must be between 0 and max players.');
        }
    }

    private validateActivityId(): void {
        if (this.activityId <= 0) {
            throw new Error('Activity ID must be a positive number.');
        }
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