import { Activity } from '@prisma/client';
import activityDb from "../repository/activity.db"

/*
const getAllActivities = async(): Promise <Activity[]> =>{
    return activityDb.getAllActivities()
}*/

const getActivityByGame = async (gameId: number): Promise<Activity[]> => {
    return await activityDb.getActivitiesByGameId(gameId)
}

export default {getActivityByGame}