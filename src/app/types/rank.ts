import { NameAndPoints } from './stat';

export type EachRank = {
    _id: string;
    offenseAvg: number;
    defenseAvg: number;
    playerScores: NameAndPoints[];
    result: number;
};
