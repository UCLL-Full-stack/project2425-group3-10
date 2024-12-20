const getGroupsFromActivity = async (activityId: number) => {
    const token = sessionStorage.getItem('token');

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups/${activityId}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Correct Bearer spelling and interpolation
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch groups for activity ID: ${activityId}. Status: ${response.status}`);
    }

    return response.json(); // Assuming the API returns JSON data
};

const addUserToGroup = async (groupId: number, userId: number) => {
    const token = sessionStorage.getItem('token');

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups/${groupId}/user/${userId}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to add user ${userId} to group ${groupId}. Status: ${response.status}`);
    }

    return response.json(); // Assuming the API returns confirmation data
};

const createGroup = async (groupData: { name: string; maxPlayers: number; activityId: number }) => {
    const token = sessionStorage.getItem('token');

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(groupData),
    });

    if (!response.ok) {
        throw new Error(`Failed to create group. Status: ${response.status}`);
    }

    return response.json();
};

const getAllGroups = async () => {
    const token = sessionStorage.getItem('token');

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch all groups. Status: ${response.status}`);
    }

    return response.json();
}

const deleteGroup = async (groupId: number) => {
    const token = sessionStorage.getItem('token');

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups/${groupId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to delete group ${groupId}. Status: ${response.status}`);
    }
}

export default {getGroupsFromActivity, addUserToGroup, createGroup, deleteGroup, getAllGroups};
