import { atom } from 'recoil';

export const selectedTeam = atom({
    key: 'selectedTeam',
    default: [] as any
});

export const playerStatTable = atom({
    key: 'playerStatTable',
    default: [] as any
});

export const isLoginState = atom({
    key: 'isLoginState',
    default: false
});

export const creditState = atom({
    key: 'creditState',
    default: 0
});
