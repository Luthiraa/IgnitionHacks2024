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
        <>

            <div className="section">
                <div className="container">
                    <div className="row full-height justify-content-center">
                        <div className="col-12 text-center align-self-center py-5">
                            <div className="section pb-5 pt-5 pt-sm-2 text-center">
                                <h6 className="mb-0 pb-3">
                                    <span>Log In / </span><span>Sign Up</span>
                                </h6>
                                <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" checked={isLogin} onChange={() => setIsLogin(!isLogin)} />
                                <label htmlFor="reg-log"></label>
                                <div className="card-3d-wrap mx-auto">
                                    <div className="card-3d-wrapper">
                                        <div className="card-front">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="mb-4 pb-3">Log In</h4>
                                                    <div className="form-group">
                                                        <input type="text" name="logemail" className="form-style" placeholder="Your Username" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="off" />
                                                        <i className="input-icon uil uil-user"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input type="password" name="logpass" className="form-style" placeholder="Your Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="off" />
                                                        <i className="input-icon uil uil-lock-alt"></i>
                                                    </div>
                                                    <button className="btn mt-4" onClick={handleLogin}>submit</button>
                                                    <p className="mb-0 mt-4 text-center"><a href="#0" className="link">Forgot your password?</a></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-back">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="mb-4 pb-3">Sign Up</h4>
                                                    <div className="form-group">
                                                        <input type="text" name="logname" className="form-style" placeholder="Your Username" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="off" />
                                                        <i className="input-icon uil uil-user"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input type="email" name="logemail" className="form-style" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" />
                                                        <i className="input-icon uil uil-at"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input type="password" name="logpass" className="form-style" placeholder="Your Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="off" />
                                                        <i className="input-icon uil uil-lock-alt"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input type="password" name="confirmpass" className="form-style" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="off" />
                                                        <i className="input-icon uil uil-lock-alt"></i>
                                                    </div>
                                                    <button className="btn mt-4" onClick={handleSignup}>submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {alertMessage && <p className="alert">{alertMessage}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;