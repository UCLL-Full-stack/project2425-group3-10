import { Achievement } from '../domain/model/achievement';
import { database } from '../util/db.server';
import { Prisma } from '@prisma/client';

const getAllAchievements = async (): Promise<Achievement[]> => {
    try {
        const achievementsPrisma = await database.achievement.findMany();
        return achievementsPrisma.map((achievementPrisma) => Achievement.from(achievementPrisma));
    } catch (error) {
        console.log(error);
        throw new Error(`Error occurred while getting all achievements`);
    }
}

const getAchievementById = async (achievementId: number): Promise<Achievement> => {
    const achievement = await database.achievement.findUnique({
        where: {
            id: achievementId
        }
    });
    if (!achievement) {
        throw new Error(`Achievement with id ${achievementId} not found`);
    }
    return Achievement.from(achievement);
}

const createAchievement = async (newAchievement: Achievement): Promise<Achievement> => {
    const achievement = await database.achievement.create({
        data: {
            name: newAchievement.getName(),
            description: newAchievement.getDescription()
        }
    });
    return Achievement.from(achievement);
}

const updateAchievement = async (updatedAchievement: Achievement): Promise<Achievement> => {
    const achievement = await database.achievement.update({
        where: {
            id: updatedAchievement.getId()
        },
        data: {
            name: updatedAchievement.getName(),
            description: updatedAchievement.getDescription()
        }
    });
    return Achievement.from(achievement);
}

const deleteAchievement = async (achievementId: number): Promise<Achievement> => {
    const achievement = await database.achievement.delete({
        where: {
            id: achievementId
        }
    });
    return Achievement.from(achievement);
}


export default { getAllAchievements, getAchievementById, createAchievement, updateAchievement, deleteAchievement };
