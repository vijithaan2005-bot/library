import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function Nav() {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        setTimeout(()=>{
            navigate('/')
        },2000)
        ;
    };

    return (
        <nav className="navbar">

            <div className="navbar-logo"  > 
                <img src="/images/logolib.png" alt="" />
                <span>LIBRARIA</span> </div>

            <div className="navbar-links">
                <button className="logout-button" onClick={logout}><img src="images/logout.png" alt="" width={25} height={25} /></button>

            </div>

        </nav>
    );
}

export default Nav;