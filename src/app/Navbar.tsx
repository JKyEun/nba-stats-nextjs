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
                <div className='right-side'>
                    <div className='item ranking'>
                        <Image src='/ranking.svg' alt='랭킹' width={20} height={20} />
                        <span>RANKING</span>
                    </div>
                    <div className='item login'>
                        <Image src='/login.svg' alt='랭킹' width={20} height={20} />
                        <span>LOGIN</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
