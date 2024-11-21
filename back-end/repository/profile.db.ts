import { Profile } from '../domain/model/profile';
import { database } from '../util/db.server';
import { Prisma } from '@prisma/client';

const getAllProfiles = async (): Promise<Profile[]> => {
    try {
        const profilesPrisma = await database.profile.findMany({
            include: {
                user: true,
                achievements: {
                    include: {
                        achievement: true
                    }
                },
                games: {
                    include: {
                        game: true
                    }
                }
            }
        });

        return profilesPrisma.map((profilePrisma) => Profile.from(profilePrisma));
    } catch (error) {
        console.log(error);
        throw new Error(`Error occurred while getting all profiles`);
    }
}



export default { getAllProfiles};
