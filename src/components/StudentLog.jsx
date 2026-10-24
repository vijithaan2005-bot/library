import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './StudentLog.css';

function StudentLog() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const studentlogin = async (e) => {

        e.preventDefault();

        setMessage('');
        setError('');

        try {

            const res = await axios.post(
                'http://localhost:5000/api/student/stLogin',
                {
                    email,
                    password
                }
            );

            console.log('LOGIN RESPONSE', res.data);

            localStorage.setItem('token', res.data.token);

            localStorage.setItem(
                'student',
                JSON.stringify(res.data.student)
            );

            setMessage('Student login successful! ');

            setTimeout(() => {
                navigate('/stdash');
            }, 1500);

        } catch (err) {

            console.log(err);

            setError(
                err.response?.data?.message ||
                'Failed to login'
            );
        }
    };

    return (

        <div className="student-login-page">

            <div className="student-login-left">

                <div className="student-login-icon">
                    <img src="/images/books.png" alt="" />
                </div>

                <h1>
                    Welcome Back!
                </h1>

                <p>
                    Continue your journey through
                    knowledge and discover your next
                    favorite book.
                </p>

                <div className="login-books">

                   
                    <span><img src="/images/books1.png" alt="" width={35}height={35} /></span>
                    <span><img src="/images/books2.png" alt="" width={35}height={35} /></span>
                    <span><img src="/images/books3.png" alt="" width={35}height={35} /></span>
                    <span><img src="/images/books4.png" alt="" width={35}height={35} /></span>

                </div>

            </div>
            <div className="student-login-right">

                <div className="student-login-card">

                    <div className="student-login-header">

                        <div className="login-small-icon">
                            <img src="/images/admin.png" alt="" />
                        </div>

                        <h2>
                            Student Login
                        </h2>

                        <p>
                            Sign in to access your library
                        </p>

                    </div>


                    <form
                        onSubmit={studentlogin}
                        className="student-login-form"
                    >

                        <div className="student-input-group">

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
                        <div className="student-input-group">

                            <label>
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                            />

                        </div>


                        <button
                            type="submit"
                            className="student-login-btn"
                        >
                            Login →
                        </button>

                    </form>

                    {message && (

                        <div className="student-success">
                             {message}
                        </div>

                    )}
                    {error && (

                        <div className="student-error">
                             {error}
                        </div>

                    )}

                    <div className="student-register-link">

                        Don't have an account?

                        <button
                            onClick={() => navigate('/streg')}
                        >
                            Register
                        </button>

                    </div>
                    <button
                    className="back-home-btn"
                    onClick={() => navigate('/')}
                >
                    ← Back to Home
                </button>

                </div>

            </div>

        </div>
    );
}

export default StudentLog;