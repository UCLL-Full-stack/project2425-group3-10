import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { useRouter } from 'next/router';
import UserService from '@/services/UserService';
import { User } from '@/types';

const User: React.FC = () => {
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
            setMessage('Failed to load user data');
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
                setMessage('User updated successfully!');
                router.push('/userOverview'); // Redirect after update
            }
        } catch (error) {
            console.error(error);
            setMessage('Failed to update user');
        }
    };

    const handleDelete = async () => {
        try {
            const response = await UserService.deleteUser(userId as string);
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            setMessage('User deleted successfully!');
            router.push('/userOverview'); // Redirect after deletion
        } catch (error) {
            console.error(error);
            setMessage('Failed to delete user');
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
                <h1 className="text-2xl font-bold mb-6 text-center">User Management</h1>
                {user && formData ? (
                    <form onSubmit={handleUpdate} className="space-y-4">
                        <h2 className="text-xl font-semibold mb-4">{user.username}</h2>
                        <div>
                            <label htmlFor="id" className="block mb-2 text-sm">User ID</label>
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
                            <label htmlFor="username" className="block mb-2 text-sm">Username</label>
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
                            <label htmlFor="email" className="block mb-2 text-sm">Email</label>
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
                            <label htmlFor="role" className="block mb-2 text-sm">Role</label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                            >
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                                <option value="MODERATOR">MODERATOR</option>
                            </select>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
                            >
                                Update
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg w-full"
                            >
                                Delete
                            </button>
                        </div>
                    </form>
                ) : (
                    <p className="text-center">{message || 'Loading...'}</p>
                )}
                {message && <p className="mt-4 text-center text-yellow-400">{message}</p>}
            </div>
        </>
    );
};

export default User;
