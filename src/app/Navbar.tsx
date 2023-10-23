'use client';

import Image from 'next/image';
import React from 'react';
import '../style/navbar.scss';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();

    const goStatPage = () => {
        router.push('/');
    };

    return (
        <div className='nav-bar'>
            <div className='nav-bar-container'>
                <div className='left-side'>
                    <div onClick={goStatPage} className='logo'>
                        NBA-Simulator
                    </div>
                </div>
                <div className='right-side'>
                    <div className='item credit'>Credit: 1</div>
                    <div className='item help'>
                        <Image src='/help.svg' alt='도움말' width={20} height={20} />
                    </div>
                    <div className='item ranking'>
                        <Image src='/ranking.svg' alt='랭킹' width={20} height={20} />
                    </div>
                    <div className='item login'>
                        <Image src='/login.svg' alt='랭킹' width={20} height={20} />
                    </div>
                </div>
            </div>
        </div>
    );
}
