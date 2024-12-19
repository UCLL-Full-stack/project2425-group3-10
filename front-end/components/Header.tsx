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
        <header className="header">
            <div>
                <h1>Playpal</h1>
            </div>
            <nav className="navbar">
                <a href="">Home</a>
                <a href="games">Games</a>
                <a href="community">Community</a>
                <a href="about">About</a>
                {loggedInUser && loggedInUser?.role === "ADMIN" && <a href="UserOverview">UserOverview</a>}
                {loggedInUser && (loggedInUser?.role === "MODERATOR" || loggedInUser?.role === "ADMIN") && <a href="GameOverview">ActivityOverview</a>}
                {!loggedInUser ? (
                    <a href="#" onClick={toggleLoginForm}>
                        Login
                    </a>
                ) : (
                    <a href="#" onClick={handleLogout}>
                        Logout
                    </a>
                )}
            </nav>

            {isLoginOpen && <LoginForm onClose={toggleLoginForm} />}
        </header>
    );
};

export default Header;
