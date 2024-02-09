import { connectDB } from '@/app/util/database';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function kakaoLogin(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const client = await connectDB;
            const userDB = client.db('nba-simulator').collection('user');

            const { id } = req.body;
            const user = await userDB.findOne({ id });

            if (user) {
                res.status(200).send(user.id);
            } else {
                const newUser = {
                    id,
                    password: '0000',
                    credit: 100
                };
                await userDB.insertOne(newUser);

                res.status(201).send(newUser.id);
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Error 500.');
        }
    }
}
