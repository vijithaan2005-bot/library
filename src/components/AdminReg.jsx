import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminReg.css';

function AdminReg() {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const adminregister = async (e) => {
        e.preventDefault();

        setMessage('');
        setError('');

        try {
            const res = await axios.post(
                'http://localhost:5000/api/admin/adRegister',
                {
                    name,
                    email,
                    password
                }
            );

            localStorage.setItem('token', res.data.token);

            setMessage('Admin registered successfully');

            setTimeout(() => {
                navigate('/adlog');
            }, 1000);

        } catch (err) {

            if (
                err.response?.data?.message ===
                'Admin already registered'
            ) {

                setError(
                    'Admin already registered. Please login.'
                );

                setTimeout(() => {
                    navigate('/adlog');
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
        <div className="admin-register">

            
            <div className="admin-register-left">

                <div className="library-icon">
                <img src="/images/books.png" alt="" />
                </div>

                <h1>
                    Welcome to
                    <span> Libraria</span>
                </h1>

                <p>
                    Manage your library, books, students
                    and transactions from one place.
                </p>

                <div className="admin-features">
                    <div>Manage Books</div>
                    <div>Manage Students</div>
                    <div>Transactions</div>
                    
                </div>

            </div>


           
            <div className="admin-register-right">

                <div className="register-card">

                    <div className="card-header">
                        <span><img src="/images/admin.png" alt="" /></span>

                        <h2>
                            Admin Registration
                        </h2>

                        <p>
                            Create your administrator account
                        </p>
                    </div>


                    <form onSubmit={adminregister}>

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
                                Email
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
                            Create Admin Account
                            <span> → </span>
                        </button>

                    </form>


                    {message && (
                        <p className="success-message">
                             {message}
                        </p>
                    )}

                    {error && (
                        <p className="error-message">
                             {error}
                        </p>
                    )}


                    <div className="login-link">

                        Already have an account?

                        <button
                            onClick={() =>
                                navigate('/adlog')
                            }
                        >
                            Login
                        </button>

                    </div>
                    

                </div>

            </div>

        </div>
    );
}

export default AdminReg;