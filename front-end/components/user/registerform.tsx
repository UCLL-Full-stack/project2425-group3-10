import React, { useState } from 'react';

const RegisterForm: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: ''

    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8080/user/addUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Something went wrong');
                return;
            }

            // Clear form or handle success response
            console.log('User registered successfully');
        } catch (error) {
            setErrorMessage('Failed to register user');
        }
    };

    return (
        <div className="flex items-center justify-center mt-36">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg h-auto p-7 flex flex-col items-center justify-center bg-gray-200 drop-shadow-lg rounded"
            >
                <h1>Register</h1>

                <label htmlFor="email" className="text-left w-3/5">Email</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-3/5 border rounded-lg h-9 mb-3 px-2 focus:outline-none focus:border-cyan-600"
                />

                <label htmlFor="Password" className="text-left w-3/5">Password</label>
                <input
                    type="text"
                    name="email"
                    id="email"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-3/5 border rounded-lg h-9 mb-3 px-2 focus:outline-none focus:border-cyan-600"
                />

                <label htmlFor="role" className="text-left w-3/5">Role</label>
                <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-3/5 border rounded-lg h-9 mb-5 px-2 focus:outline-none border-cyan-600"
                >
                    <option value={1}>user</option>
                    <option value={0}>admin</option>
                </select>

                <button type="submit" className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-500 w-2/5">
                    Register
                </button>
                <a className="text-xs text-blue-600 hover:underline" href="/login">Already have an account</a>

                {errorMessage && <div className="mt-4 text-center text-red-500" id="errors">{errorMessage}</div>}
            </form>
        </div>
    );
};

export default RegisterForm;