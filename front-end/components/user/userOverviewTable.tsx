import React from 'react';
import { User } from '@/types';
import { useTranslation } from 'next-i18next';

type Props = {
    users: Array<User>;
}

const UserOverviewTable: React.FC<Props> = ({ users }: Props) => {
    const { t } = useTranslation();

    return (
        <>
            <div className="overflow-x-auto">
                <table className="table-auto w-100 border-collapse border border-gray-300 m-auto">
                    <thead>
                    <tr className="bg-black-200">
                        <th className="border border-gray-300 px-4 py-2">{t('nav_user_overview')}</th>
                        <th className="border border-gray-300 px-4 py-2">{t('username')}</th>
                        <th className="border border-gray-300 px-4 py-2">{t('email')}</th>
                        <th className="border border-gray-300 px-4 py-2">{t('role')}</th>
                        <th className="border border-gray-300 px-4 py-2">{t('edit')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users && users.map((user) => (
                        <tr key={user.id} className="hover:bg-blue-800">
                            <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                            <td className="border border-gray-300 px-4 py-2 flex items-center">
                                <a href={`user/${user.id}`} className="text-blue-500 hover:text-blue-800">
                                    <img
                                        src="../../images/edit.png"
                                        alt={t('edit')} // Use translation for alt text as well
                                        className="w-4 h-4 mr-2"
                                    />
                                </a>
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
