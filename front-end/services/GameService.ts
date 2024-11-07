import {Game} from '@/types';

const getAllGames = async() =>{
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/games',{
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export default {getAllGames}