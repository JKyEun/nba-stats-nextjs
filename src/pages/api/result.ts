import { NextApiRequest, NextApiResponse } from 'next';
import { PlayerStat, TeamSpec } from '../../app/types/stat';
const ENTIRE_ASSIST_AVERAGE = 5.73;
const ENTIRE_REB_STL_AVERAGE = 7.83;
const POSSESSION_RATE = [0.5, 0.26, 0.12, 0.07, 0.05];

export default async function result(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const [team1, team2] = req.body;

            const team1Class = new Team(team1);
            const team2Class = new Team(team2);

            const teamSpecs = {
                team1: {
                    assist: team1Class.getAssistAvg(),
                    reboundStealSum: team1Class.getRebStlSumAvg(),
                    opponentBlock: team2Class.getBlockAvg(),
                    sorted: team1Class.getPlayerSortByFG()
                },
                team2: {
                    assist: team2Class.getAssistAvg(),
                    reboundStealSum: team2Class.getRebStlSumAvg(),
                    opponentBlock: team1Class.getBlockAvg(),
                    sorted: team2Class.getPlayerSortByFG()
                }
            };

            const getPlayerScore = (teamSpec: TeamSpec, team: PlayerStat[]) => {
                const fgVar = teamSpec.assist - ENTIRE_ASSIST_AVERAGE - teamSpec.opponentBlock;
                const possesionVar = teamSpec.reboundStealSum - ENTIRE_REB_STL_AVERAGE;
                const possesion = 50 + possesionVar;
                const score = team.map((player: PlayerStat, idx) => {
                    const adjustedFGRate = (player.fgRate + fgVar) / 100;
                    const isMinus = Math.random() < 0.5 ? true : false;
                    const condition = Math.floor(Math.random() * 10) * (isMinus ? -1 : 1);
                    const virtualScore =
                        possesion * POSSESSION_RATE[idx] * adjustedFGRate * 2 +
                        player.pt3Num +
                        player.ftNum +
                        condition;
                    console.log(virtualScore, player.name);
                    const realScore = player.points;
                    return { name: player.name, points: Math.round((virtualScore * 9 + realScore) / 10) };
                });
                return score;
            };

            const score = {
                team1: getPlayerScore(teamSpecs.team1, team1),
                team2: getPlayerScore(teamSpecs.team2, team2)
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
