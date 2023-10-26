'use client';

import React, { useEffect } from 'react';
import { kakaoLogin } from '../../../apis/user';
import Loading from '../../../components/Loading';
import { useRouter } from 'next/navigation';
import { useSetRecoilState } from 'recoil';
import { isLoginState } from '../../../recoil/atom';
import { GRANT_TYPE, KAKAO_CLIENT_ID, KAKAO_REDIRECT_URI } from '@/app/constants/kakaoLogin';

export default function KakaoRedirectHandler() {
    const router = useRouter();
    const setIsLogin = useSetRecoilState(isLoginState);

    useEffect(() => {
        const CODE = new URL(window.location.href).searchParams.get('code');

        async function loginFetch() {
            const tokenResponse = await fetch(
                `https://kauth.kakao.com/oauth/token?grant_type=${GRANT_TYPE}&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${CODE}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                    }
                }
            );

            if (tokenResponse.status === 200) {
                const tokenData = await tokenResponse.json();
                const userResponese = await fetch(`https://kapi.kakao.com/v2/user/me`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${tokenData.access_token}`,
                        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                    }
                });

                if (userResponese.status === 200) {
                    const userKaKaoInfo = await userResponese.json();

                    console.log(userKaKaoInfo);

                    const userLoginInfo = {
                        id: userKaKaoInfo.id
                    };

                    const registerResponse = await kakaoLogin(userLoginInfo);

                    if (registerResponse?.status === 200 || registerResponse?.status === 201) {
                        localStorage.setItem('UID', registerResponse?.data);
                        router.push('/');
                        setIsLogin(true);
                    } else {
                        console.log('회원 등록 이상');
                        router.push('/login');
                    }
                } else {
                    console.log('카카오 로그인 회원 정보 획득 실패');
                    router.push('/login');
                }
            } else {
                console.log('카카오 로그인 토큰 발행 실패');
                router.push('/login');
            }
        }
        loginFetch();
    });

    return <Loading />;
}
