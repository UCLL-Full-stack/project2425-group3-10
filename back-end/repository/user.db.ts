import { User } from '../domain/model/user';

import { database } from '../util/db.server';
import {Prisma} from '@prisma/client';

const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany();
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    }catch (error){
        console.log(error);
        throw new Error(`Error occurred while getting all users`);
    }
}

const getUserById = async (userId: number): Promise<User> => {
    const user = await database.user.findUnique({
        where: {
            id: userId
        }
    })
    if(!user){
        throw new Error(`User with id ${userId} not found`);
    }
    return User.from(user);
}

const createUser = async (newUser: User): Promise<User> => {
    const user = await database.user.create({
        data: {
            email: newUser.getEmail(),
            password: newUser.getPassword(),
            role: newUser.getRole()
        }
    });
    return User.from(user);
}

const updateUser = async (updatedUser: User): Promise<User> => {
    const user = await database.user.update({
        where: {
            id: updatedUser.getId()
        },
        data: {
            email: updatedUser.getEmail(),
            password: updatedUser.getPassword(),
            role: updatedUser.getRole()
        }
    });
    return User.from(user);
}

const deleteUser = async (userId: number): Promise<User> => {
    const user = await database.user.delete({
        where: {
            id: userId
        }
    });
    return User.from(user);
}


export default { getAllUsers, getUserById, createUser, updateUser, deleteUser }