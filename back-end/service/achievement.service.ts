import achievementDb from '../repository/achievement.db'
import { Achievement } from '../domain/model/achievement';

const getAchievementById =async (id:number): Promise <Achievement> =>{
    return achievementDb.getAchievementById(id)
}

export default {
    getAchievementById,
}