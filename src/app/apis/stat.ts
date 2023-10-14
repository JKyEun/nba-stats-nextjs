import { PlayerStat } from '../types/stat';
import api from './index';

const getStats = async () => {
    try {
        const res = await api.get('/stat');
        return res.data;
    } catch (err) {
        console.error(err);
    }
};

const getGameResult = async (selectedTeam: [PlayerStat[]], playerStatTable: PlayerStat[]) => {
    try {
        const payload = {
            selectedTeam,
            playerStatTable
        };
        const res = await api.post('/result', payload);
        return res.data;
    } catch (err) {
        console.error(err);
    }
};

export { getStats, getGameResult };
