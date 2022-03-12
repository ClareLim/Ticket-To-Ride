import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { Button } from './Button';


// Sources: https://www.youtube.com/watch?v=I2UBjN5ER4s

export default function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    return (
        <div>
            <>
                <nav className="navbar">
                    <div className="navbar-container">
                        <Link to="/" className="navbar-logo">
                            Ticket To Ride <i className='fab fa-typo3'></i>
                        </Link>
                        <div className='menu-icon' onClick={handleClick} >
                            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                        </div>
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/home' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/add' className='nav-links' onClick={closeMobileMenu}>
                                Add
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/display' className='nav-links' onClick={closeMobileMenu}>
                                Display
                            </Link>
                        </li>
                    </ul>
                </nav>
            </>

        </div>);
};