import profileDb from '../repository/profile.db';

const getAllProfiles = async () => {
    return profileDb.getAllProfiles();
}

const getProfileById = async (profileId: number) => {
    return profileDb.getProfileById(profileId);
}

export default {
    getAllProfiles,
    getProfileById,
}