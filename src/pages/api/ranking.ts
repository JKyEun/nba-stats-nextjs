import { connectDB } from '@/app/util/database';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function ranking(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const client = await connectDB;
            const db = client.db('nba-simulator').collection('ranking');
            const rankingCursor = db.find({});
            const ranking = await rankingCursor.toArray();
            res.status(200).json(ranking);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error 500.');
        }
    }
}
