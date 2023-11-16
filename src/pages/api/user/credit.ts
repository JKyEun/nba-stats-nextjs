import { connectDB } from '@/app/util/database';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function Credit(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const client = await connectDB;
            const userDB = client.db('nba-simulator').collection('user');

            const { id } = req.body;
            const user = await userDB.findOne({ id });

            if (user) {
                if (user.credit >= 1) {
                    await userDB.updateOne({ id }, { $inc: { credit: -1 } });
                    res.status(200).send('Credit decremented successfully');
                } else {
                    res.status(403).send('Not enough credit');
                }
            } else {
                res.status(401).send('No User ID');
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Error 500.');
        }
    } else if (req.method === 'GET') {
        try {
            const client = await connectDB;
            const userDB = client.db('nba-simulator').collection('user');

            const { id } = req.query;
            const user = await userDB.findOne({ id: Number(id) });

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
