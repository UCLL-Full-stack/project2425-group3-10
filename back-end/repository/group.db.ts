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

const getGroupsForUser = async (userId: number): Promise<number[]> => {
    try {
        // Fetch userGroups entries for the user
        const userGroups = await database.userGroups.findMany({
            where: {
                userId: userId,
            },
            select: {
                groupId: true,
            },
        });

        // Extract group IDs from the result
        return userGroups.map((userGroup) => userGroup.groupId);
    } catch (error) {
        console.log(error);
        throw new Error(`Error occurred while fetching groups for user ${userId}`);
    }
};

const removeUserFromGroup = async (userId: number, groupId: number): Promise<void> => {
    try {
        // Check if the user is part of the group
        const userGroup = await database.userGroups.findUnique({
            where: {
                userId_groupId: { userId, groupId },
            },
        });

        if (!userGroup) {
            throw new Error(`User with ID ${userId} is not a member of group ${groupId}.`);
        }

        // Remove the user from the group
        await database.userGroups.delete({
            where: {
                userId_groupId: { userId, groupId },
            },
        });

        // Decrement the group's currentPlayers count
        const group = await database.group.findUnique({
            where: {
                id: groupId,
            },
        });

        if (group) {
            await database.group.update({
                where: {
                    id: groupId,
                },
                data: {
                    currentPlayers: group.currentPlayers > 0 ? group.currentPlayers - 1 : 0,
                },
            });
        }
    } catch (error) {
        console.log(error);
        throw new Error(`Error occurred while removing user ${userId} from group ${groupId}`);
    }
};

const getAllGroups = async (): Promise<Group[]> => {
    try {
        const groupsPrisma = await database.group.findMany();

        return groupsPrisma.map((groupPrisma) => Group.from(groupPrisma));
    } catch (error) {
        console.log(error);
        throw new Error(`Error occurred while getting all groups`);
    }
}

const getGroupById = async (groupId: number): Promise<Group> => {
    try {
        const group = await database.group.findUnique({
            where: {
                id: groupId,
            },
        });

        if (!group) {
            throw new Error(`Group with ID ${groupId} not found.`);
        }

        return Group.from(group);
    } catch (error) {
        console.log(error);
        throw new Error(`Error occurred while getting group ${groupId}`);
    }
}

const deleteGroup = async (groupId: number): Promise<void> => {
    const group = await getGroupById(groupId);
    try {
        await database.userGroups.deleteMany({
            where: {
                groupId: groupId,
            },
        });

        await database.group.delete({
            where: {
                id: groupId,
            },
        });
    } catch (error) {
        throw new Error(`Error occurred while deleting group ${groupId}`);
    }
}

export default {getGroupsByGameId, addUserToGroup,createGroup, getGroupsForUser, removeUserFromGroup, getAllGroups, deleteGroup};