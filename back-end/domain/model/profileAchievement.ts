import { Achievement } from './achievement';
import { Achievement as AchievementPrisma,
    ProfileAchievement as profileAchievementPrisma
} from "@prisma/client";
import achievementService from '../../service/achievement.service';

export class ProfileAchievement {
    private achievement: Achievement;
    private earned: boolean;
    private achievedDate: Date;
    private profileId: number;

    constructor(achievement: Achievement, earned: boolean, achievedDate: Date, profileId:number) {
        this.achievement = achievement;
        this.earned = earned;
        this.achievedDate = achievedDate;
        this.profileId=profileId
    }

    static async from(profileAchievementPrisma: profileAchievementPrisma): Promise<ProfileAchievement> {

        const achievementData = await achievementService.getAchievementById(profileAchievementPrisma.achievementId);

        return new ProfileAchievement(
            achievementData,
            profileAchievementPrisma.earned,
            profileAchievementPrisma.achievedDate,
            profileAchievementPrisma.profileId
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
