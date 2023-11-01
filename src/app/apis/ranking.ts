import { Result } from '../types/stat';
import api from './index';

export const getRanking = async () => {
    try {
        const res = await api.get('/ranking/get');
        return res.data;
    } catch (err) {
        console.error(err);
    }
};

export const setRanking = async (record: Result, nickname: string) => {
    try {
        const payload = { ...record, nickname };
        const res = await api.post('/ranking/set', payload);
        return res.data;
    } catch (err) {
        console.error(err);
    }
};
