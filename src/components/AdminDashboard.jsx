import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {

    const navigate = useNavigate();

    const adminData = localStorage.getItem('admin');

    let admin = null;

    try {
        if (adminData && adminData !== 'undefined') {
            admin = JSON.parse(adminData);
        }
    } catch (err) {
        console.log('Invalid admin data');
        localStorage.removeItem('admin');
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('admin');

        navigate('/adlogin');
    };

    return (
        <div className="admin-dashboard">

            <main className="dashboard-content">

                

                <div className="welcome-section">

                    <div>
                        <p className="dashboard-label">
                            ADMIN DASHBOARD
                        </p>

                        <h1>
                            Welcome, {admin?.name || 'Admin'}
                        </h1>

                        <p className="admin-email">
                            {admin?.email}
                        </p>
                    </div>

                    <div className="admin-avatar">
                        <img
                            src="/images/admin.png"
                            alt="Admin"
                        />
                    </div>

                </div>


                <div className="dashboard-cards">

                    <div
                        className="dashboard-card"
                        onClick={() => navigate('/books')}
                    >
                        <div className="card-icon green">
                            <img
                                src="/images/books.png"
                                alt="Books"
                            />
                        </div>

                        <h2>Manage Books</h2>

                        <p>
                            Add, update and manage all library books.
                        </p>

                        <button>
                            View Books →
                        </button>
                    </div>


                    <div
                        className="dashboard-card"
                        onClick={() => navigate('/addbook')}
                    >
                        <div className="card-icon blue">
                            <img
                                src="/images/plus.png"
                                alt="Add Book"
                            />
                        </div>

                        <h2>Add Book</h2>

                        <p>
                            Add new books to your library collection.
                        </p>

                        <button>
                            Add New Book →
                        </button>
                    </div>


                    <div
                        className="dashboard-card"
                        onClick={() => navigate('/students')}
                    >
                        <div className="card-icon purple">
                            <img
                                src="/images/admin.png"
                                alt="Students"
                            />
                        </div>

                        <h2>Manage Students</h2>

                        <p>
                            View and manage registered students.
                        </p>

                        <button>
                            View Students →
                        </button>
                    </div>


                    <div
                        className="dashboard-card"
                        onClick={() => navigate('/transactions')}
                    >
                        <div className="card-icon orange">
                            <img
                                src="/images/trans.png"
                                alt="Transactions"
                            />
                        </div>

                        <h2>Transactions</h2>

                        <p>
                            Track issued and returned books.
                        </p>

                        <button>
                            View Transactions →
                        </button>
                    </div>

                </div>


                <div className="dashboard-info">

                    <div>
                        <span>
                            <img
                                src="/images/books.png"
                                alt="Books"
                            />
                        </span>

                        <div>
                            <strong>Library Management</strong>

                            <p>
                                Manage your library easily and efficiently.
                            </p>
                        </div>
                    </div>


                    <div>
                        <span>
                            <img
                                src="/images/admin.png"
                                alt="Admin"
                            />
                        </span>

                        <div>
                            <strong>Admin Access</strong>

                            <p>
                                You are logged in as an administrator.
                            </p>
                        </div>
                    </div>
                    <button
                    className="back-home-btn"
                    onClick={() => navigate('/')}
                >
                    ← Back to Home
                </button>


                </div>

            </main>

        </div>
    );
}

export default AdminDashboard;