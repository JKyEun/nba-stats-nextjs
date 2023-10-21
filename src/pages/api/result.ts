import { NextApiRequest, NextApiResponse } from 'next';
import { PlayerStat, TeamSpec } from '../../app/types/stat';
const POSSESSION_RATE = [0.5, 0.26, 0.12, 0.07, 0.05];
const BENCH_PTS = 20;

export default async function result(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const playerStatTable: PlayerStat[] = req.body.playerStatTable;

            const myTeam = req.body.selectedTeam;
            const opponentTeam = [
                playerStatTable[3],
                playerStatTable[7],
                playerStatTable[11],
                playerStatTable[15],
                playerStatTable[19]
            ];

            const entireAssistAvg = Number(
                (playerStatTable.reduce((acc, item) => acc + item.assist, 0) / playerStatTable.length).toFixed(2)
            );
            const entireRebStlAvg = Number(
                (
                    playerStatTable.reduce((acc, item) => acc + item.rebound + item.steal, 0) / playerStatTable.length
                ).toFixed(2)
            );
            const entireBlkAvg = Number(
                (playerStatTable.reduce((acc, item) => acc + item.block, 0) / playerStatTable.length).toFixed(2)
            );

            const myTeamClass = new Team(myTeam);
            const opponentTeamClass = new Team(opponentTeam);

            const myTeamSpec = {
                assist: myTeamClass.getAssistAvg(),
                reboundStealSum: myTeamClass.getRebStlSumAvg(),
                opponentBlock: entireBlkAvg,
                sorted: myTeamClass.getPlayerSortByFG()
            };
            const opoonentTeamSpec = {
                assist: opponentTeamClass.getAssistAvg(),
                reboundStealSum: opponentTeamClass.getRebStlSumAvg(),
                opponentBlock: entireBlkAvg,
                sorted: opponentTeamClass.getPlayerSortByFG()
            };

            const getPlayerScore = (teamSpec: TeamSpec, team: PlayerStat[]) => {
                const fgVar = teamSpec.assist - entireAssistAvg - teamSpec.opponentBlock;
                const possesionVar = teamSpec.reboundStealSum - entireRebStlAvg;
                const possesion = 50 + possesionVar;
                const score = team.map((player: PlayerStat, idx) => {
                    const adjustedFGRate = (player.fgRate + fgVar) / 100;
                    const isMinus = Math.random() < 0.5 ? true : false;
                    const condition = Math.floor(Math.random() * 5) * (isMinus ? -1 : 1);
                    const virtualScore =
                        possesion * POSSESSION_RATE[idx] * adjustedFGRate * 2 +
                        player.pt3Num +
                        player.ftNum +
                        condition;
                    const realScore = player.points;
                    return { name: player.name, points: Number(((virtualScore * 9 + realScore) / 10).toFixed(1)) };
                });
                return score;
            };

            const offenseAvg =
                Number(
                    getPlayerScore(myTeamSpec, myTeam)
                        .reduce((acc, item) => acc + item.points, 0)
                        .toFixed(1)
                ) + BENCH_PTS;
            const defenseAvg = Number(
                getPlayerScore(opoonentTeamSpec, opponentTeam)
                    .reduce((acc, item) => acc + item.points, 0)
                    .toFixed(1)
            );
            let winResult = 45 + Math.round(offenseAvg - defenseAvg);
            winResult = winResult > 82 ? 82 : winResult;

            const score = {
                offenseAvg,
                defenseAvg,
                playerScores: getPlayerScore(myTeamSpec, myTeam),
                result: [winResult, 82 - winResult]
            };

            res.status(200).send(score);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error 500.');
        }
    }
}

class Team {
    team: PlayerStat[];

    constructor(team: PlayerStat[]) {
        this.team = team;
    }

    getAssistAvg() {
        return this.team.reduce((acc, item) => acc + item.assist, 0) / 5;
    }

    getRebStlSumAvg() {
        const rebound = this.team.reduce((acc, item) => acc + item.rebound, 0);
        const steal = this.team.reduce((acc, item) => acc + item.steal, 0);
        return (rebound + steal) / 5;
    }

    getBlockAvg() {
        return this.team.reduce((acc, item) => acc + item.block, 0) / 5;
    }

    getPlayerSortByFG() {
        const sortedTeam = this.team.sort((a: PlayerStat, b: PlayerStat) => {
            const tryFGNumA = (100 * a.fgNum) / a.fgRate;
            const tryFGNumB = (100 * b.fgNum) / b.fgRate;
            return tryFGNumB - tryFGNumA;
        });
        return sortedTeam;
    }
}
