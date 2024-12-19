import {Activity, Game} from "@/types";

const getActivitiesFromGame = async (gameId: number) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/activities/${gameId}`,{
        method: 'GET',
        headers: {
            "Content-Type":"application/json"
        }
    })
};
export default {getActivitiesFromGame};