import Image from 'next/image';
import React from 'react';
import '../style/navbar.scss';

export default function Navbar() {
    return (
        <div className='nav-bar'>
            <div className='nav-bar-container'>
                <div className='left-side'>
                    <div className='logo'>NBA-Simulator</div>
                </div>
            </div>
        </div>
    );
}
