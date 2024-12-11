import { Profile } from '../domain/model/profile';
import { database } from '../util/db.server';

const getAllProfiles = async (): Promise<Profile[]> => {
    try {
        const profilesPrisma = await database.profile.findMany({
            include: {
                user: true,
                games: {
                    include: {
                        game: true,
                    },
                },
            },
        });

        return Promise.all(
            profilesPrisma.map(async (profilePrisma) =>
                Profile.from({
                    ...profilePrisma,
                    games: profilePrisma.games, // Pass games as nested relation
                })
            )
        );
    } catch (error) {
        console.log(error);
        throw new Error(`Error occurred while getting all profiles`);
    }
};

const getProfileById = async (profileId: number): Promise<Profile> => {
    const profile = await database.profile.findUnique({
        where: {
            id: profileId,
        },
        include: {
            user: true,
            games: {
                include: {
                    game: true,
                },
            },
        },
    });
    if (!profile) {
        throw new Error(`Profile with id ${profileId} not found`);
    }
    return Profile.from({
        ...profile,
        games: profile.games, // Pass games as nested relation
    });
}







export default { getAllProfiles, getProfileById, };
