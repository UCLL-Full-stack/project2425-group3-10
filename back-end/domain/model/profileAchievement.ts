import { Achievement } from './achievement';

export class ProfileAchievement {
    private profileId: number;
    private achievementId: number;
    private earned: boolean;
    private achievedDate: Date;
    private achievement: Achievement;

    constructor(profileAchievement: {
        profileId: number;
        achievementId: number;
        earned: boolean;
        achievedDate: Date;
        achievement: Achievement;
    }) {
        this.profileId = profileAchievement.profileId;
        this.achievementId = profileAchievement.achievementId;
        this.earned = profileAchievement.earned;
        this.achievedDate = profileAchievement.achievedDate;
        this.achievement = profileAchievement.achievement;
    }

    static from(profileAchievement: {
        profileId: number;
        achievementId: number;
        earned: boolean;
        achievedDate: Date;
        achievement: Achievement;
    }): ProfileAchievement {
        return new ProfileAchievement({
            profileId: profileAchievement.profileId,
            achievementId: profileAchievement.achievementId,
            earned: profileAchievement.earned,
            achievedDate: profileAchievement.achievedDate,
            achievement: Achievement.from(profileAchievement.achievement),
        });
    }
}
