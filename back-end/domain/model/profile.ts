import { User } from './user';
import { Game } from './game';
import {
    Profile as ProfilePrisma,
    User as UserPrisma,
    Game as GamePrisma, ProfileGames
} from '@prisma/client';

export class Profile {
    readonly id?: number;
    readonly username: string;
    readonly pfp: string;
    readonly user: User;
    readonly gamesPlayed: Game[];

    constructor(profile: {
        id?: number;
        username: string;
        pfp: string;
        user: User;
        gamesPlayed: Game[]
    }) {
        this.id = profile.id;
        this.username = profile.username;
        this.pfp = profile.pfp;
        this.user = profile.user;
        this.gamesPlayed = profile.gamesPlayed;
    }

    getid(): number | undefined {
        return this.id;
    }

    getusername(): string {
        return this.username;
    }

    getPfp(): string {
        return this.pfp;
    }

    getUser(): User {
        return this.user;
    }

    getGamesPlayed(): Game[] {
        return this.gamesPlayed;
    }

    addToGamesPlayed(game: Game) {
        this.gamesPlayed.push(game);
    }

    equals(profile: Profile): boolean {
        return (
            this.id === profile.getid() &&
            this.username === profile.getusername() &&
            this.user === profile.getUser() &&
            this.pfp === profile.getPfp() &&
            this.gamesPlayed === profile.getGamesPlayed()
        );
    };

    static async from({
                          id,
                          username,
                          pfp,
                          user,
                          games
                      }: ProfilePrisma & {
        user: UserPrisma;
        games: (ProfileGames & { game: GamePrisma })[];
    }) {
        return new Profile({
            id: id,
            username: username,
            pfp: pfp.toString(),
            user: User.from(user),
            gamesPlayed: games.map(({ game }) => Game.from(game)), // Map each game's data
        });
    }
}