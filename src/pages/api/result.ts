import { NextApiRequest, NextApiResponse } from 'next';
import { PlayerStat } from '../../app/types/stat';
const ENTIRE_ASSIST_AVERAGE = 5.73;
const ENTIRE_REB_STL_AVERAGE = 7.83;

export default async function result(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const [team1, team2] = req.body;

            const team1Class = new Team(team1);
            const team2Class = new Team(team2);

            const teamSpec = {
                team1: {
                    assist: team1Class.getAssistAvg(),
                    reboundStealSum: team1Class.getRebStlSumAvg(),
                    block: team1Class.getBlockAvg(),
                    sorted: team1Class.getPlayerSortByFG()
                },
                team2: {
                    assist: team2Class.getAssistAvg(),
                    reboundStealSum: team2Class.getRebStlSumAvg(),
                    block: team2Class.getBlockAvg(),
                    sorted: team2Class.getPlayerSortByFG()
                }
            };

            const score = {
                team1: [],
                team2: []
            };
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
