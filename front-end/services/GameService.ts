const getAllGames = async () => {
    const token = sessionStorage.getItem("token")


    return fetch(process.env.NEXT_PUBLIC_API_URL + '/games', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Correct Bearer spelling and interpolation
        }
    });
};

export default { getAllGames };
