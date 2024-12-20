import React, { useEffect, useState } from 'react';
import LoginForm from '@/components/user/loginForm';
import { User } from "@/types";
import { router } from 'next/client';
import Language from '@/components/language/language';
import { useTranslation } from 'next-i18next';

const Header: React.FC = () => {
    const { t } = useTranslation();
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    const toggleLoginForm = () => {
        setIsLoginOpen(!isLoginOpen);
    };

    const getLoggedInUser = () => {
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user) {
                setLoggedInUser(user);
            }
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
        setLoggedInUser(null);
        router.push("/");
    };

    useEffect(() => {
        getLoggedInUser();
    }, []);

    return (
        <header className="bg-gray-800 text-white shadow-md">
            <div className="container mx-auto flex justify-between items-center px-6 py-3">
                {/* Logo / Title */}
                <h1 className="text-xl font-bold text-indigo-400">{t('title')}</h1>

                {/* Navigation Links */}
                <nav className="flex space-x-8">
                    <a href="/" className="hover:text-indigo-400 transition duration-200">
                        {t('nav_home')}
                    </a>
                    {loggedInUser && (
                        <a href="games" className="hover:text-indigo-400 transition duration-200">
                            {t('nav_games')}
                        </a>
                    )}
                    {loggedInUser && loggedInUser?.role === 'ADMIN' && (
                        <a href="userOverview" className="hover:text-indigo-400 transition duration-200">
                            {t('nav_user_overview')}
                        </a>
                    )}
                    {!loggedInUser ? (
                        <a
                            href="#"
                            onClick={toggleLoginForm}
                            className="hover:text-indigo-400 transition duration-200"
                        >
                            {t('nav_login')}
                        </a>
                    ) : (
                        <a
                            href="#"
                            onClick={handleLogout}
                            className="hover:text-red-400 transition duration-200"
                        >
                            {t('nav_logout')}
                        </a>
                    )}
                    {<Language />}
                </nav>
            </div>

            <div className="h-0.5 bg-indigo-500" />
            {isLoginOpen && <LoginForm onClose={toggleLoginForm} />}
        </header>
    );
};

export default Header;
