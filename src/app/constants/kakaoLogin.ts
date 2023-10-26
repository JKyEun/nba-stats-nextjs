export const GRANT_TYPE = 'authorization_code';
export const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
export const KAKAO_REDIRECT_URI = window.location.origin.includes('localhost')
    ? 'http://localhost:3000/oauth/callback/kakao'
    : '';
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
