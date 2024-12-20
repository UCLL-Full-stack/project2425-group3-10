import groupDb from '../repository/group.db';
import { Group } from '../domain/model/group';

const getGroupsByActivityId =async (activityId: number): Promise<Group[]> =>{
    return await groupDb.getGroupsByGameId(activityId);
}

const addUserToGroup =async (groupId: number, userId: number):Promise <void> =>{
    return await groupDb.addUserToGroup(groupId, userId)
}

const createGroup = async (newGroup: Group): Promise<Group> => {
    return await groupDb.createGroup(newGroup);
};

const getAllGroups = async (): Promise<Group[]> => {
    return await groupDb.getAllGroups();
}

const deleteGroup = async (groupId: number): Promise<void> => {
    return await groupDb.deleteGroup(groupId);
}


export default { getGroupsByActivityId, addUserToGroup, createGroup, deleteGroup, getAllGroups };

