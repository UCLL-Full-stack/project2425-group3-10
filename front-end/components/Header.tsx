import React, { useState } from 'react';
import LoginForm from '@/components/user/loginForm';

const Header : React.FC = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const toggleLoginForm = () => {
        setIsLoginOpen(!isLoginOpen);
    };


    return (
        <header className="header">
            {/* <div className="h1">LFG</div> */}
            <div>
                <h1>
                    Playpal
                </h1>
            </div>
            <nav className="navbar">
                <a href="" >Home</a>
                <a href="games" >Games</a>
                <a href="community">Community</a>
                <a href="about" >About</a>
                <a href="#" onClick={toggleLoginForm}>
                    Login
                </a>
            </nav>

            {isLoginOpen && <LoginForm onClose={toggleLoginForm} />}
        </header>
    )
}
export default Header;