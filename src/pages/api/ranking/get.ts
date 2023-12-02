import { connectDB } from '@/app/util/database';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function get(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const client = await connectDB;
            const rankingDB = client.db('nba-simulator').collection('ranking');
            const ranking = (
                await rankingDB.find({}).sort({ result: -1, offenseAvg: -1, deffenseAvg: 1 }).toArray()
            ).slice(0, 20);
            res.status(200).json(ranking);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error 500.');
        }
    }
}
