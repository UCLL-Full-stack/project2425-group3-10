import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Login } from '@/types';
import UserService from '@/services/UserService';

interface LoginFormProps {
    onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [emailError, setEmailError] = React.useState("");
    const [passwordError, setPasswordError] = React.useState("");

    const [statusMessage, setStatusMessage] = React.useState("");

    const router = useRouter();
    const { t } = useTranslation();

    const validate = (): boolean => {
        let isValid = true;

        setEmailError("");
        setPasswordError("");
        setStatusMessage("");

        if (!email || email.trim() === "") {
            setEmailError("Email is required");
            isValid = false;
        }
        if (!password || password.trim() === "") {
            setPasswordError("Password is required");
            isValid = false;
        }
        return isValid;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!validate()) {
            return;
        }
        try {
            const user: Login = {
                email,
                password,
            };

            const response = await UserService.login(user);
            if (response.status === 200) {
                setStatusMessage("Login successful");
                onClose();
            } else {
                setStatusMessage("Login failed");
            }
        } catch (error) {
            setStatusMessage("Login failed");
        }
    };

    return (
        <div className="login-dropdown">
            <button className="close-btn" onClick={onClose}>
                ×
            </button>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {emailError && <p className="error">{emailError}</p>}
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {passwordError && <p className="error">{passwordError}</p>}
                </div>
                <div>
                    <a href="/register">Create account</a>
                </div>
                <button type="submit">Submit</button>
            </form>
            {statusMessage && <p className="status">{statusMessage}</p>}
        </div>
    );
};

export default LoginForm;
