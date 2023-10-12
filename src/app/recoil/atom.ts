import { atom } from 'recoil';

export const selectedTeam = atom({
    key: 'selectedTeam',
    default: [] as any
});
