import { connectDB } from '@/app/util/database';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function get(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const client = await connectDB;
            const rankingDB = client.db('nba-simulator').collection('ranking');

            const newRecord = req.body;
            await rankingDB.insertOne(newRecord);

            res.status(200).send('랭킹 등록 성공');
        } catch (err) {
            console.error(err);
            res.status(500).send('Error 500.');
        }
    }
}
