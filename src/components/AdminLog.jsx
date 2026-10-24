import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminLog.css';

function AdminLog() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const adminlogin = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const res = await axios.post(
                'http://localhost:5000/api/admin/adLogin',
                { email, password }
            );

            localStorage.setItem("token", res.data.token);
            localStorage.setItem(
                "admin",
                JSON.stringify(res.data.admin)
            );

            setMessage("Admin login successfully");

            setTimeout(() => {
                navigate('/addash');
            }, 1500);

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to login"
            );
        }
    };

    return (
        <div className="admin-login-page">

            <div className="admin-login-card">

                <div className="admin-icon">
                    <img src="/images/admin.png" alt="" />
                </div>

                <h1>Admin Login</h1>

                <p className="login-subtitle">
                    Welcome back, Administrator
                </p>

                <form onSubmit={adminlogin}>

                    <div className="input-group">
                        <label>Email</label>
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
                        <label>Password</label>
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
                        className="login-btn"
                    >
                        Login
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

                <div className="back-section">
                    <button
                        onClick={() => navigate('/')}
                        className="back-btn"
                    >
                        ← Back to Home
                    </button>
                </div>

            </div>

        </div>
    );
}

export default AdminLog;