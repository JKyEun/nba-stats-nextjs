'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import Navbar from './Navbar';

const excludeNavbarPage = ['/help'];

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname() || '';

    return (
        <>
            {!excludeNavbarPage.includes(pathname) && <Navbar />}
            {children}
        </>
    );
}
