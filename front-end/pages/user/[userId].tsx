import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { useRouter } from 'next/router';
import UserService from '@/services/UserService';
import { User } from '@/types';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const User: React.FC = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { userId } = router.query;

    const [user, setUser] = useState<User | null>(null);
    const [formData, setFormData] = useState<User | null>(null);
    const [message, setMessage] = useState('');

    const getUser = async () => {
        try {
            const response = await UserService.getUser(userId as string);
            if (!response.ok) {
                throw new Error('Failed to fetch user');
            }

            const user = await response.json();
            setUser(user);
            setFormData(user);
        } catch (error) {
            console.error(error);
            setMessage(t('failed_to_load_user_data'));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        } as User);
    };

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (formData) {
                const response = await UserService.updateUser(formData);
                if (!response.ok) {
                    throw new Error('Failed to update user');
                }
                setMessage(t('user_updated_successfully'));
                router.push('/userOverview'); // Redirect after update
            }
        } catch (error) {
            console.error(error);
            setMessage(t('failed_to_update_user'));
        }
    };

    const handleDelete = async () => {
        try {
            const response = await UserService.deleteUser(userId as string);
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            setMessage(t('user_deleted_successfully'));
            router.push('/userOverview'); // Redirect after deletion
        } catch (error) {
            console.error(error);
            setMessage(t('failed_to_delete_user'));
        }
    };

    useEffect(() => {
        if (userId) {
            getUser();
        }
    }, [userId]);

    return (
        <>
            <Header />
            <div className="max-w-lg mx-auto mt-10 bg-gray-800 p-8 rounded-lg shadow-md text-white">
                <h1 className="text-2xl font-bold mb-6 text-center">{t('user_management')}</h1>
                {user && formData ? (
                    <form onSubmit={handleUpdate} className="space-y-4">
                        <h2 className="text-xl font-semibold mb-4">{user.username}</h2>
                        <div>
                            <label htmlFor="id" className="block mb-2 text-sm">{t('user_id')}</label>
                            <input
                                type="text"
                                id="id"
                                name="id"
                                value={formData.id}
                                disabled
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                            />
                        </div>
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm">{t('username')}</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm">{t('email')}</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                            />
                        </div>
                        <div>
                            <label htmlFor="role" className="block mb-2 text-sm">{t('role')}</label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                            >
                                <option value="USER">{t('user_role')}</option>
                                <option value="ADMIN">{t('admin_role')}</option>
                                <option value="MODERATOR">{t('moderator_role')}</option>
                            </select>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
                            >
                                {t('update')}
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg w-full"
                            >
                                {t('delete')}
                            </button>
                        </div>
                    </form>
                ) : (
                    <p className="text-center">{message || t('loading')}</p>
                    )}
                {message && <p className="mt-4 text-center text-yellow-400">{message}</p>}
            </div>
        </>
    );
};

export const getServerSideProps = async (context: { locale: any }) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
};

export default User;
