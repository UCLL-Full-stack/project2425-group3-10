import { Genre } from "../../types";
import { Game as GamePrisma } from '@prisma/client';

export class Game {
    readonly id?: number;
    readonly name: string;
    readonly genre: Genre;
    readonly logo!: string;

    constructor(game: { id?: number; name: string; genre: Genre; logo: Buffer | string }) {
        this.id = game.id;
        this.name = game.name;
        this.genre = game.genre;
        this.logo = game.logo instanceof Buffer ? game.logo.toString('base64') : game.logo;

        this.validate();
    }

    private validate(): void {
        this.validateName();
    }

    private validateName(): void {
        if (!this.name || this.name.trim().length === 0) {
            throw new Error('Game name cannot be empty.');
        }
    }





    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getGenre(): Genre {
        return this.genre;
    }

    getLogo(): string {
        return this.logo;
    }

    equal(game: Game): boolean {
        return (
            this.id === game.getId() &&
            this.name === game.getName()
        );
    }

    static from({ id, name, genre, logo }: GamePrisma): Game {
        return new Game({ id, name, genre: genre as Genre, logo: Buffer.from(logo) });
    }
}
