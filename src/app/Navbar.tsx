'use client';

import Image from 'next/image';
import React, { useEffect } from 'react';
import '../style/navbar.scss';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { creditState, isLoginState } from './recoil/atom';
import { getUserCredit } from './apis/user';

export default function Navbar() {
    const [isLogin, setIsLogin] = useRecoilState(isLoginState);
    const [credit, setCredit] = useRecoilState(creditState);

    const logout = () => {
        setIsLogin(false);
        window.localStorage.removeItem('ID');
    };

    useEffect(() => {
        const fetchCredit = async () => {
            const id = window.localStorage.getItem('ID');
            if (id) {
                const res = await getUserCredit(id);
                setCredit(res?.data.credits);
            }
        };
        fetchCredit();
    }, [isLogin]);

    return (
        <div className='nav-bar'>
            <div className='nav-bar-container'>
                <div className='left-side'>
                    <Link href='/' className='logo'>
                        NBA-Simulator
                    </Link>
                </div>
                <div className='right-side'>
                    {isLogin && <div className='item credit'>Credit: {credit}</div>}
                    <Link href='/help' className='item help'>
                        <Image src='/help.svg' alt='도움말' width={20} height={20} />
                    </Link>
                    <Link href='/ranking' className='item ranking'>
                        <Image src='/ranking.svg' alt='랭킹' width={20} height={20} />
                    </Link>
                    {isLogin ? (
                        <div onClick={logout} className='item login'>
                            <Image src='/logout.svg' alt='랭킹' width={20} height={20} />
                        </div>
                    ) : (
                        <Link href='/login' className='item login'>
                            <Image src='/login.svg' alt='랭킹' width={20} height={20} />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
