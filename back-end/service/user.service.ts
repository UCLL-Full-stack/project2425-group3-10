import {User} from "../domain/model/user";
import userDb from "../repository/user.db";
import jwt = require("jsonwebtoken");
import jwtUtil from "../util/jwt";
import bcrypt = require("bcrypt");
import { UserInput } from '../types';




const getAllUsers = async (): Promise<User[]>=>{
    return userDb.getAllUsers()
};

const getUserById= async (userId: number): Promise<User> =>{
    return userDb.getUserById(userId)
}

const createUser = async (newUser: User): Promise<User> => {
    return await userDb.createUser(newUser);
};

const updateUser = async (updatedUser: User): Promise<User> => {
    return userDb.updateUser(updatedUser)
}

const deleteUser = async (userId: number): Promise<User> => {
    return userDb.deleteUser(userId)
}

const getUserByEmail = async (email: string): Promise<User> => {
    return userDb.getUserByEmail(email)
}

const authenicate = async ({email, password}:UserInput): Promise<string> => {
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
    authenicate,
    getUserByEmail
}