import Image from 'next/image';
import React from 'react';
import '../style/navbar.scss';
import Link from 'next/link';

export default function Navbar() {
    return (
        <div className='nav-bar'>
            <div className='nav-bar-container'>
                <div className='left-side'>
                    <Link href='/' className='logo'>
                        NBA-Simulator
                    </Link>
                </div>
                <div className='right-side'>
                    <div className='item credit'>Credit: 1</div>
                    <Link href='/help' className='item help'>
                        <Image src='/help.svg' alt='도움말' width={20} height={20} />
                    </Link>
                    <Link href='/ranking' className='item ranking'>
                        <Image src='/ranking.svg' alt='랭킹' width={20} height={20} />
                    </Link>
                    <Link href='/login' className='item login'>
                        <Image src='/login.svg' alt='랭킹' width={20} height={20} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
