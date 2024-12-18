import { Activity } from '../domain/model/activity';
import { database } from '../util/db.server';

/*
const getAllActivities = async () => {
    try {
        const activitiesPrisma = await database.activity.findMany({
            include: {
                groups: true,
                game: true
            }
        });

        return activitiesPrisma.map((activityPrisma) => Activity.from(activityPrisma));
    } catch (error) {
        console.log(error);
        throw new Error(`Error occurred while getting all activities`);
    }
}
*/

const getActivitiesByGameId = async (gameId: number): Promise<Activity[]> => {
    try {
        const activitiesPrisma = await database.activity.findMany({
            where: {
                game:{
                    id: gameId
                }
            },
            include: {
                Groups: true,
                game: true
            }
        });

        return activitiesPrisma.map((activityPrisma) => Activity.from(activityPrisma));
    } catch (error) {
        console.log(error);
        throw new Error(`Error occurred while getting all activities`);
    }
}

export default {getActivitiesByGameId, /*getAllActivities*/}