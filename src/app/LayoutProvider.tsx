'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { useSetRecoilState } from 'recoil';
import { isLoginState } from './recoil/atom';

const excludeNavbarPage = ['/help', '/login', '/ranking'];

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname() || '';
    const setIsLogin = useSetRecoilState(isLoginState);

    useEffect(() => {
        const id = window.localStorage.getItem('ID');
        if (id) setIsLogin(true);
    }, []);

    return (
        <>
            {!excludeNavbarPage.includes(pathname) && <Navbar />}
            {children}
        </>
    );
}
