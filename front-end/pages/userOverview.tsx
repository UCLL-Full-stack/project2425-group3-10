import Header from '@/components/Header';
import useSWR, { mutate } from 'swr';
import { Profile } from '@/types';
import UserOverviewTable from '@/components/user/userOverviewTable';
import profileService from '@/services/profileService';
import useInterval from '@use-it/interval';

const UserOverview: React.FC = () => {
    const getProfiles = async (): Promise<Profile[]> => {
        const response = await profileService.getAllProfiles();
        if (!response.ok) {
            throw new Error('Failed to fetch profiles');
        }
        return response.json();
    };

    const { data: profiles, error } = useSWR<Profile[]>('profiles', getProfiles);

    useInterval(() => {
        mutate('profiles', getProfiles());
    }, 30000);

    return (
        <>
            <Header />
            {error && (
                <p className="text-red-500">
                    {error instanceof Error ? error.message : 'An unexpected error occurred'}
                </p>
            )}
            <div className="max-w-300 p-10">
                {profiles ? (
                    <UserOverviewTable profiles={profiles} />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    );
};

export default UserOverview;
