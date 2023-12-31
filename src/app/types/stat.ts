export type PlayerStat = {
    assist: number;
    block: number;
    fgNum: number;
    fgRate: number;
    ftNum: number;
    ftRate: number;
    games: number;
    name: string;
    points: number;
    pt3Num: number;
    pt3Rate: number;
    rank: number;
    rebound: number;
    steal: number;
    cost: number;
};

export type TeamSpec = {
    assist: number;
    reboundStealSum: number;
    opponentBlock: number;
    sorted: PlayerStat[];
};

export type NameAndPoints = {
    name: string;
    points: number;
};

export type Result = {
    playerScores: NameAndPoints[];
    offenseAvg: number;
    defenseAvg: number;
    result: number;
};
