import {User} from "../domain/model/user";
import userDb from "../domain/data-access/user.db";

const getAllUsers = async (): Promise<User[]>=>{
    return userDb.getAllUsers()
};

const getUserById= async (userId: number): Promise<User> =>{
    return userDb.getUserById(userId)
}

const createUser= async (newUser: User): Promise<User> =>{
    return userDb.createUser(newUser)
}

const updateUser = async (updatedUser: User): Promise<User> => {
    return userDb.updateUser(updatedUser)
}

const deleteUser = async (userId: number): Promise<User> => {
    return userDb.deleteUser(userId)
}
export default {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}