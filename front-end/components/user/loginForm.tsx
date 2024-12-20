import React from 'react';
import { useRouter } from 'next/router';
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
                router.reload();
                onClose();
            } else {
                setStatusMessage("Login failed");
            }
        } catch (error) {
            setStatusMessage("Login failed");
        }
    };

    return (
        <div className="absolute top-16 right-4 bg-gray-800 text-white rounded-lg shadow-lg p-6 w-80 transition-transform transform">
            <button
                className="text-red-500 float-right text-xl hover:text-red-700"
                onClick={onClose}
            >
                ×
            </button>
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-600 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        required
                    />
                    {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-600 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        required
                    />
                    {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                </div>
                <div className="mb-4 text-right">
                    <a
                        href="/register"
                        className="text-indigo-400 hover:underline text-sm"
                    >
                        Create account
                    </a>
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded transition"
                >
                    Submit
                </button>
            </form>
            {statusMessage && (
                <p className="text-center text-sm mt-4 text-red-400">{statusMessage}</p>
            )}
        </div>
    );
};

export default LoginForm;
