import Header from '@/components/Header';
import useSWR, { mutate } from 'swr';
import UserOverviewTable from '@/components/user/userOverviewTable';
import useInterval from '@use-it/interval';
import { User } from '@/types';
import UserService from '@/services/UserService';

const UserOverview: React.FC = () => {
    const getUsers = async (): Promise<User[]> => {
        const response = await UserService.getAllUsers();
        if (!response.ok) {
            throw new Error('Failed to fetch profiles');
        }
        return response.json();
    };

    const { data: users, error } = useSWR<User[]>('profiles', getUsers);

    useInterval(() => {
        mutate('users', getUsers());
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
                {users ? (
                    <UserOverviewTable users={users} />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    );
};

export default UserOverview;
