import { atom } from 'recoil';

export const selectedTeam = atom({
    key: 'selectedTeam',
    default: [] as any
});

export const playerStatTable = atom({
    key: 'playerStatTable',
    default: [] as any
});
