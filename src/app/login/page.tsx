import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '../../style/loginPage.scss';

export default function page() {
    return (
        <div className='login-page'>
            <Link href='/' className='kakao-login-btn'>
                <Image src='/kakao-logo.svg' alt='카카오 로고' width={24} height={23} />
                <span>카카오로 3초만에 계속하기</span>
            </Link>
        </div>
    );
}
