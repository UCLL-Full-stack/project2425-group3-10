import { User } from '../domain/model/user';

import { database } from '../util/db.server';
import {Prisma} from '@prisma/client';
import bcrypt = require("bcrypt");

const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany();
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    }catch (error){
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
            password: await bcrypt.hash(newUser.getPassword(), 12),
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
            password: await bcrypt.hash(updatedUser.getPassword(), 12),
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

const getUserByEmail = async (email: string): Promise<User> => {
    const user = await database.user.findUnique({
        where: {
            email: email
        }
    })
    if(!user){
        throw new Error(`User with email ${email} not found`);
    }
    return User.from(user);
}




export default { getAllUsers, getUserById, createUser, updateUser, deleteUser, getUserByEmail,  }