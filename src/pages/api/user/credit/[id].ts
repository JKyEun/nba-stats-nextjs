import { connectDB } from '@/app/util/database';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function Credit(req: NextApiRequest, res: NextApiResponse) {
    const {
        method,
        query: { id }
    } = req;

    if (method === 'GET') {
        try {
            const client = await connectDB;
            const userDB = client.db('nba-simulator').collection('user');

            const user = await userDB.findOne({ id });

            if (user) {
                res.status(200).json({ credits: user.credit });
            } else {
                res.status(404).send('User not found');
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Error 500.');
        }
    } else {
        res.status(405).send('Method Not Allowed');
    }
}
