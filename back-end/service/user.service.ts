import {User} from "../model/user";
import userDb from "../repository/user.db";

const getAllUsers = (): User[]=>{
    return userDb.getAllUsers()
};

const getUserById= (userId: number): User | undefined =>{
    return userDb.getUserById(userId)
}

const createUser= (newUser: User): User =>{
    return userDb.createUser(newUser)
}

const updateUser =(updatedUser: User): User => {
    return userDb.updateUser(updatedUser)
}

const deleteUser = (userId: number): User | undefined => {
    return userDb.deleteUser(userId)
}
export default {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}