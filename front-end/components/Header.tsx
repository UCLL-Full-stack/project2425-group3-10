import React, { useEffect, useState } from 'react';
import LoginForm from '@/components/user/loginForm';
import { User } from "@/types";

const Header: React.FC = () => {
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
        sessionStorage.removeItem("loggedInUser");
        setLoggedInUser(null);
    };

    useEffect(() => {
        getLoggedInUser();
    }, []);

    return (
        <header className="bg-gray-800 text-white shadow-md">
            <div className="container mx-auto flex justify-between items-center px-6 py-3">
                {/* Logo / Title */}
                <h1 className="text-xl font-bold text-indigo-400">Playpal</h1>

                {/* Navigation Links */}
                <nav className="flex space-x-8">
                    <a href="" className="hover:text-indigo-400 transition duration-200">
                        Home
                    </a>
                    <a href="games" className="hover:text-indigo-400 transition duration-200">
                        Games
                    </a>
                    <a href="community" className="hover:text-indigo-400 transition duration-200">
                        Community
                    </a>
                    <a href="about" className="hover:text-indigo-400 transition duration-200">
                        About
                    </a>
                    {loggedInUser && loggedInUser?.role === "ADMIN" && (
                        <a href="userOverview" className="hover:text-indigo-400 transition duration-200">
                            User Overview
                        </a>
                    )}
                    {loggedInUser && (loggedInUser?.role === "MODERATOR" || loggedInUser?.role === "ADMIN") && (
                        <a href="GameOverview" className="hover:text-indigo-400 transition duration-200">
                            Activity Overview
                        </a>
                    )}
                    {!loggedInUser ? (
                        <a
                            href="#"
                            onClick={toggleLoginForm}
                            className="hover:text-indigo-400 transition duration-200"
                        >
                            Login
                        </a>
                    ) : (
                        <a
                            href="#"
                            onClick={handleLogout}
                            className="hover:text-red-400 transition duration-200"
                        >
                            Logout
                        </a>
                    )}
                </nav>
            </div>


            <div className="h-0.5 bg-indigo-500" />


            {isLoginOpen && <LoginForm onClose={toggleLoginForm} />}
        </header>
    );
};

export default Header;
