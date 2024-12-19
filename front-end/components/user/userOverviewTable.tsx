import { User } from '@/types';

type Props = {
    users: Array<User>;
}

const UserOverviewTable: React.FC<Props> = ({users}: Props) => {
    return (
        <>
            <div className="overflow-x-auto">
                <table className="table-auto w-100 border-collapse border border-gray-300 m-auto">
                    <thead>
                    <tr className="bg-black-200">
                        <th className= "border border-gray-300 px-4 py-2">Id</th>
                        <th className="border border-gray-300 px-4 py-2">Username</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">Role</th>
                        <th className="border border-gray-300 px-4 py-2">Edit</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users && users.map((user) => (
                        <tr key={user.id} className="hover:bg-blue-800">
                            <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <a href={`${user.id}`} className="text-blue-500 hover:text-blue-800">Edit</a>
                            </td>

                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </>
    );
}
export default UserOverviewTable;