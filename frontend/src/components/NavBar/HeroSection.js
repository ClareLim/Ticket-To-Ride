import React from 'react';
import './App.css'
import { Button } from './Button';
import './NavBar/HeroSection.css';

function HeroSection() {
    return (
        <div className='hero-container'>
            <video src="/videos/video-2.mp4" autoPlay loop muted>
                <h1>Welcome - Adventure Awaits</h1>
                <p>Help our customers book their tickets now!</p>
                <div className="hero-btns">
                    <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--large'>Get Started with Booking</Button>
                    <Button className='btns' buttonStyle='btn--primary' buttonSize='btn--large'>Check your Alert Message</Button>
                </div>
            </video>

        </div>
    )
}

export default HeroSection