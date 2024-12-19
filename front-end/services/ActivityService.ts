

const getActivitiesFromGame = async (gameId: number) => {
    const token = sessionStorage.getItem("token")

    return fetch(process.env.NEXT_PUBLIC_API_URL + `/activities/${gameId}`,{
        method: 'GET',
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}` // Correct Bearer spelling and interpolation
        }
    })
};
export default {getActivitiesFromGame};