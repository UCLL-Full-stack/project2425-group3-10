import { database } from '../util/db.server';
import { Group } from '../domain/model/group';



const getGroupsByGameId = async (activityId: number): Promise<Group[]> => {
    try {
        const groupsPrisma = await database.group.findMany({
            where: {
                activity:{
                    id: activityId
                }
            },
        });

        return groupsPrisma.map((groupPrisma) => Group.from(groupPrisma));
    } catch (error) {
        console.log(error);
        throw new Error(`Error occurred while getting all groups`);
    }
}

const addUserToGroup = async (groupId: number, userId: number): Promise<void> => {
    try {
        const group = await database.group.findUnique({
            where: {
                id: groupId,
            },
            include: {
                Users: true,
            },
        });

        if (!group) {
            throw new Error(`Group with ID ${groupId} not found.`);
        }

        if (group.currentPlayers >= group.maxPlayers) {
            throw new Error(`Cannot add user to group ${groupId}: group is already full.`);
        }

        await database.userGroups.create({
            data: {
                userId: userId,
                groupId: groupId,
            },
        });

        await database.group.update({
            where: {
                id: groupId,
            },
            data: {
                currentPlayers: group.currentPlayers + 1,
            },
        });

    } catch (error) {
        console.log(error);
        throw new Error(`Error occurred while adding user ${userId} to group ${groupId}`);
    }
};

const createGroup = async (newGroup: Group): Promise<Group> => {
    const group = await database.group.create({
        data: {
            name: newGroup.getName(),
            maxPlayers: newGroup.getMaxPlayers(),
            currentPlayers: newGroup.getCurrentPlayers(), // Typically initialized as 0 for a new group
            activityId: newGroup.getActivityId()!, // Assuming `getId()` returns the activity ID
        },
    });
    return Group.from(group); // Convert Prisma group to your custom Group class
};

export default {getGroupsByGameId, addUserToGroup,createGroup}