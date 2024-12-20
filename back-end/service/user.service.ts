import {User} from "../domain/model/user";
import userDb from "../repository/user.db";
import jwt = require("jsonwebtoken");
import jwtUtil from "../util/jwt";
import bcrypt = require("bcrypt");
import { UserInput } from '../types';
import groupDb from '../repository/group.db';




const getAllUsers = async (): Promise<User[]>=>{
    return await userDb.getAllUsers()
};

const getUserById= async (userId: number): Promise<User> =>{
    return await userDb.getUserById(userId)
}

const createUser = async (newUser: User): Promise<User> => {
    return await userDb.createUser(newUser);
};

const updateUser = async (updatedUser: User): Promise<User> => {
    return await userDb.updateUser(updatedUser)
}

const deleteUser = async (userId: number): Promise<User> => {
    const groups = await groupDb.getGroupsForUser(userId);
    console.log(groups);
    for (const group of groups) {
        await groupDb.removeUserFromGroup(group, userId);
    }
    return await userDb.deleteUser(userId)
}

const getUserByEmail = async (email: string): Promise<User> => {
    return userDb.getUserByEmail(email)
}

const authenticate = async ({email, password}:UserInput): Promise<string> => {
    if (!email || !password) {
        throw new Error("Email and or password are required");
    }
    const user = await userDb.getUserByEmail(email);
    const isValid = await bcrypt.compare(password, user.getPassword());
    if(!isValid){
        throw new Error("Invalid password");
    }
    return jwtUtil.generateToken(email);
}

export default {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    authenticate,
    getUserByEmail
}