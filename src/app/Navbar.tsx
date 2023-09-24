import Image from 'next/image';
import React from 'react';
import '../style/navbar.scss';
import Link from 'next/link';

export default function Navbar() {
    return (
        <div className='nav-bar'>
            <div className='nav-bar-container'>
                <div className='left-side'>
                    <div>NBA-SIMULATOR</div>
                </div>
            </div>
        </div>
    );
}
