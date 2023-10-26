'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { useSetRecoilState } from 'recoil';
import { isLoginState } from './recoil/atom';

const excludeNavbarPage = ['/help', '/login'];

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname() || '';
    const setIsLogin = useSetRecoilState(isLoginState);
    const UID = window.localStorage.getItem('UID');

    useEffect(() => {
        if (UID) setIsLogin(true);
    }, []);

    return (
        <>
            {!excludeNavbarPage.includes(pathname) && <Navbar />}
            {children}
        </>
    );
}
