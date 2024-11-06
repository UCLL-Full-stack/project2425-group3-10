// components/LoginForm.tsx
import React from 'react';

interface LoginFormProps {
    onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
    return (
        <div className="login-dropdown">
            <button className="close-btn" onClick={onClose}>×</button>
            <form>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <div>
                    <a href="#">Create account</a>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default LoginForm;
