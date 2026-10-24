import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './StudentReg.css';

function StudentReg() {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const studentregister = async (e) => {

        e.preventDefault();

        setMessage('');
        setError('');

        try {

            const res = await axios.post(
                'http://localhost:5000/api/student/stRegister',
                {
                    name,
                    email,
                    password
                }
            );

            localStorage.setItem('token', res.data.token);

            setMessage('Student registered successfully ');

            setTimeout(() => {
                navigate('/stlog');
            }, 2000);

        } catch (err) {

            if (
                err.response?.data?.message ===
                'Student already registered'
            ) {

                setError(
                    'Student already registered. Please login.'
                );

                setTimeout(() => {
                    navigate('/stlog');
                }, 1500);

            } else {

                setError(
                    err.response?.data?.message ||
                    'Registration failed'
                );
            }
        }
    };

    return (

        <div className="student-register-page">

            <div className="student-register-left">

                <div className="book-icon">
                    <img src="/images/books.png" alt="" />
                </div>

                <h1>
                    Join Our Library
                </h1>

                <p>
                    Create your student account and
                    discover a world of knowledge.
                </p>

                <div className="library-decoration">

                    <span><img src="/images/books1.png" alt="" width={35}height={35} /></span>
                    <span><img src="/images/books2.png" alt="" width={35}height={35} /></span>
                    <span><img src="/images/books3.png" alt="" width={35}height={35} /></span>
                    <span><img src="/images/books4.png" alt="" width={35}height={35} /></span>

                </div>

            </div>

            <div className="student-register-right">

                <div className="register-card">

                    <div className="register-header">

                        <div className="small-logo">
                         <img src="/images/admin.png" alt="" />
                        </div>

                        <h2>
                            Student Registration
                        </h2>

                        <p>
                            Create your library account
                        </p>

                    </div>


                    <form
                        onSubmit={studentregister}
                        className="register-form"
                    >

                        <div className="input-group">

                            <label>
                                Full Name
                            </label>

                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                required
                            />

                        </div>

                        <div className="input-group">

                            <label>
                                Email Address
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                            />

                        </div>

                        <div className="input-group">

                            <label>
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                            />

                        </div>


                        <button
                            type="submit"
                            className="register-btn"
                        >
                            Create Account →
                        </button>

                    </form>

                    {message && (
                        <div className="success-message">
                             {message}
                        </div>
                    )}

                    {error && (
                        <div className="error-message">
                             {error}
                        </div>
                    )}


                    <div className="login-link">

                        Already have an account?

                        <button
                            onClick={() => navigate('/stlog')}
                        >
                            Login
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default StudentReg;