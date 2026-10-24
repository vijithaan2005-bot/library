import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {

    const navigate = useNavigate();

    return (
        <div className="home">

           
            <div className="circle circle-one"></div>
            <div className="circle circle-two"></div>

            <main className="hero">

                <div className="hero-content">

                    <div className="book-icon"> <img src="/images/logolib.png" alt="" width={70} height={50}/> </div>

                    <p className="small-title">WELCOME TO YOUR DIGITAL LIBRARY </p>

                    <h1> Your Next<span> Story </span>Is Waiting</h1>

                    <p className="description">
                        Discover amazing books, explore new worlds,
                        borrow your favourites and keep track of
                        everything you read.
                    </p>

                </div>


               
                <div className="choice-container">

                   
                    <div className="choice-card admin-card" onClick={() => navigate('/adreg')}>

                        <div className="card-icon"><img src="/images/admin.png" alt="" /></div>

                        <h2>Admin</h2>

                        <p>
                            Manage books, students and
                            library transactions.
                        </p>

                        <button>
                            Enter as Admin
                            <span> → </span>
                        </button>

                    </div>


                   
                    <div
                        className="choice-card student-card"
                        onClick={() => navigate('/streg')}
                    >

                        <div className="card-icon">
                            <img src="/images/admin.png" alt="" />
                        </div>

                        <h2>Student</h2>

                        <p>
                            Explore books, borrow books
                            and track your reading.
                        </p>

                        <button>
                            Enter as Student
                            <span> → </span>
                        </button>

                    </div>

                </div>

            </main>
            <footer>
                <p>
                    📖 Read More • Discover More • Imagine More
                </p>

                <span>
                    © 2026 Libraria Library Management System
                </span>
            </footer>

        </div>
    );
}

export default Home;