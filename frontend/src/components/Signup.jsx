import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const navigate = useNavigate();

    const resetForm = () => {
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setAlertMessage('Passwords do not match.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/signup', {
                username,
                email,
                password,
                confirm_password: confirmPassword,
            });

            if (response.data.success) {
                setAlertMessage('User created successfully.');
                resetForm();
                navigate('/home'); // Route to home page
            } else {
                setAlertMessage('Username or email already exists.');
            }
        } catch (error) {
            console.error(error);
            setAlertMessage('An error occurred. Please try again.');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/login', {
                username,
                password,
            });

            if (response.data.success) {
                setAlertMessage('Login successful.');
                resetForm();
                navigate('/home'); // Route to home page
            } else {
                setAlertMessage('Invalid username or password.');
            }
        } catch (error) {
            console.error(error);
            setAlertMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="container">
            <h2>{isLogin ? 'Login' : 'Signup'}</h2>
            <form onSubmit={isLogin ? handleLogin : handleSignup}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {!isLogin && (
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                )}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {!isLogin && (
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                )}
                <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
            </form>
            {alertMessage && <p className="alert">{alertMessage}</p>}
            <p>
                {isLogin ? (
                    <>
                        Don't have an account?{' '}
                        <button onClick={() => setIsLogin(false)}>Signup</button>
                    </>
                ) : (
                    <>
                        Already have an account?{' '}
                        <button onClick={() => setIsLogin(true)}>Login</button>
                    </>
                )}
            </p>
        </div>
    );
};

export default Signup;