import { Login, User } from '@/types';

const createUser = async(user: User) =>{
    console.log(user)
    return fetch(process.env.NEXT_PUBLIC_API_URL +'/users/create',{
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
}

const login = async(user: Login) =>{
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL +'/users/login',{
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    const data = await response.json()
    const token = data.token
    const userData = data.user
    sessionStorage.setItem('token', token)
    sessionStorage.setItem('user', JSON.stringify(userData))

    return response
}

const getAllUsers = async() =>{
    const token = sessionStorage.getItem('token')
    return fetch(process.env.NEXT_PUBLIC_API_URL +'/users',{
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
})}

export default { createUser, login, getAllUsers }