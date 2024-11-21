import { Achievement } from './achievement';
import { Achievement as AchievementPrisma,
    ProfileAchievement as profileAchievementPrisma
} from "@prisma/client";

export class ProfileAchievement {
    private achievement: Achievement;
    private earned: boolean;
    private achievedDate: Date;

    constructor(achievement: Achievement, earned: boolean, achievedDate: Date) {
        this.achievement = achievement;
        this.earned = earned;
        this.achievedDate = achievedDate;
    }

    static from(profileAchievementPrisma: profileAchievementPrisma): ProfileAchievement {
        return new ProfileAchievement(
            Achievement.from(profileAchievementPrisma.achievement),
            profileAchievementPrisma.earned,
            profileAchievementPrisma.achievedDate
        );
    }

    // Optional Getters
    getAchievement(): Achievement {
        return this.achievement;
    }

    isEarned(): boolean {
        return this.earned;
    }

    getAchievedDate(): Date {
        return this.achievedDate;
    }
}
