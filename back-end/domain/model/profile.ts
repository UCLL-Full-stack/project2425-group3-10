import { User } from './user';
import { Achievement } from './achievement';
import { ProfileAchievement } from './profileAchievement';
import { Game } from './game';
import {
    Profile as ProfilePrisma,
    User as UserPrimsa,
    ProfileAchievement as AchievementPrisma,
    Game as GamePrisma
} from '@prisma/client';

export class Profile {
    private id?: number;
    private username: string;
    private pfp: string;
    private user: User;
    private achievements: ProfileAchievement[];
    private gamesPlayed: Game[];

    constructor(profile: {
        id?: number;
        username: string;
        pfp: string;
        user: User;
        achievements: ProfileAchievement[];
        gamesPlayed: Game[]
    }) {
        this.id = profile.id;
        this.username = profile.username;
        this.pfp = profile.pfp;
        this.user = profile.user;
        this.achievements = profile.achievements;
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

    getAchievements(): ProfileAchievement[] {
        return this.achievements;
    }

    // addAchievement(achievement: ProfileAchievement): ProfileAchievement {
    //     this.achievements.push(ProfileAchievement);
    // }

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
            this.achievements === profile.getAchievements() &&
            this.gamesPlayed === profile.getGamesPlayed()
        );
    }

    static async from(profile: ProfilePrisma & {
        user: UserPrimsa;
        achievements: AchievementPrisma[];
        games: GamePrisma[];
    }): Promise<Profile> {

        // omdat achievements in profile achievements met een async gecalled worden, moeten deze hier ook met async gecalled worden.
        const achievements = await Promise.all(
            profile.achievements.map((profileAchievement) => ProfileAchievement.from(profileAchievement)
            )
        );

        return new Profile({
            id: profile.id,
            username: profile.username,
            pfp: profile.pfp,
            user: User.from(profile.user), // Assuming User.from is synchronous
            achievements: achievements,
            gamesPlayed: profile.games.map((game) => Game.from(game))
        });
    }


}