import {User} from '@/types'

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

export default { createUser }