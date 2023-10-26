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
                res.status(200).send(user.uid);
            } else {
                const newUser = {
                    uid: Number(new Date()) + Math.random(),
                    id,
                    password: '0000',
                    nickName: '닉네임을 설정하세요'
                };
                await userDB.insertOne(newUser);

                res.status(201).send(newUser.uid);
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Error 500.');
        }
    }
}
