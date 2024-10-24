import {User} from "../domain/model/user";
import userDb from "../domain/data-access/user.db";

const getAllUsers = (): Promise<User[]>=>{
    return userDb.getAllUsers()
};

const getUserById= (userId: number): Promise<User> =>{
    return userDb.getUserById(userId)
}

const createUser= (newUser: User): Promise<User> =>{
    return userDb.createUser(newUser)
}

const updateUser =(updatedUser: User): Promise<User> => {
    return userDb.updateUser(updatedUser)
}

const deleteUser = (userId: number): Promise<User> => {
    return userDb.deleteUser(userId)
}
export default {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}