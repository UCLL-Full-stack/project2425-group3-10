import { User } from './user';
import { Achievement } from './achievement';
import { ProfileAchievement } from './profileAchievement';
import { Game } from './game';
import {
    Profile as ProfilePrisma,
    User as UserPrimsa,
    ProfileAchievement as AchievementPrisma,
    Game as GamePrisma, ProfileGames
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
        achievements: (AchievementPrisma & { achievement: Achievement })[];
        games: (ProfileGames & { game: GamePrisma })[];
    }): Promise<Profile> {
        // Convert achievements into `ProfileAchievement` instances
        const achievements = await Promise.all(
            profile.achievements.map(async (profileAchievement) =>
                ProfileAchievement.from({
                    ...profileAchievement,
                    achievement: profileAchievement.achievement,
                })
            )
        );

        const gamesPlayed = profile.games.map((profileGame) =>
            Game.from(profileGame.game)
        );

        return new Profile({
            id: profile.id,
            username: profile.username,
            pfp: profile.pfp,
            user: User.from(profile.user),
            achievements,
            gamesPlayed,
        });
    }


}