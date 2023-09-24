import api from './index';

const getStats = async () => {
    try {
        const res = await api.get('/stat');
        return res.data;
    } catch (err) {
        console.error(err);
    }
};

export default getStats;
