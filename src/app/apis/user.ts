import api from './index';

export const kakaoLogin = async (info: { id: number }) => {
    try {
        const res = await api.post('/user/kakao-login', info);
        return res;
    } catch (err) {
        console.error(err);
    }
};
