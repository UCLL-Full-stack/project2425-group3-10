const getAllProfiles = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/profiles', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export default { getAllProfiles }