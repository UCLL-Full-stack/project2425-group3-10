import {User} from "../model/user";

const users: User[] = [
    new User({
        id: 1,
        email: 'johndoe@gmail.com',
        password: 'johnpassword123',
        role: 'user'
    }),
    new User({
        id: 2,
        email: 'janesmith@gmail.com',
        password: 'janesmith456',
        role: 'admin'
    }),

    new User({
        id: 3,
        email: 'bobwilliams@gmail.com',
        password: 'bobpassword789',
        role: 'admin'
    }),
    new User({
        id: 4,
        email: 'emilyjohnson@gmail.com',
        password: 'emilyjohnson234',
        role: 'user'
    })
]

const getAllUsers = (): User[] => {
    return users
}

const getUserById = (userId: number): User | undefined => {
    for (let user of users){
        if (user.getId() == userId){
            return user
        }
        else{
            return undefined
        }
    }
}

const createUser =(newUser: User): User =>{
    return newUser
}

const updateUser =(updatedUser: User): User => {
    return updatedUser
}

const deleteUser = (userId: number): User | undefined =>{
    return getUserById(userId)
}

export default {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}