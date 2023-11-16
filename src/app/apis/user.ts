import api from './index';

export const kakaoLogin = async (info: { id: number }) => {
    try {
        const res = await api.post('/user/kakao-login', info);
        return res;
    } catch (err) {
        console.error(err);
    }
};

export const getUserCredit = async (id: string) => {
    try {
        const res = await api.get(`/user/credit?id=${id}`);
        return res;
    } catch (err) {
        console.error(err);
    }
};

export const decreaseUserCredit = async (id: number) => {
    try {
        const res = await api.post('/user/credit', id);
        return res;
    } catch (err) {
        console.error(err);
    }
};
