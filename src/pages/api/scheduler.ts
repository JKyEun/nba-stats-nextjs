import { connectDB } from '@/app/util/database';

async function setUserCreditEveryDay() {
    try {
        const client = await connectDB;
        const userDB = client.db('nba-simulator').collection('user');
        const users = await userDB.find({}).toArray();

        await Promise.all(
            users.map(async user => {
                if (user.credits < 3) {
                    await userDB.updateOne({ id: user.id }, { $inc: { credits: 1 } });
                } else {
                    await userDB.updateOne({ id: user.id }, { $set: { credits: 3 } });
                }
            })
        );
    } catch (err) {
        console.error(err);
    }
}

async function resetRankingEveryWeek() {
    try {
        const client = await connectDB;
        const rankingDB = client.db('nba-simulator').collection('ranking');
        await rankingDB.deleteMany({});
    } catch (err) {
        console.error(err);
    }
}

const schedule = require('node-schedule');
schedule.scheduleJob('0 0 * * *', function () {
    setUserCreditEveryDay();
});
schedule.scheduleJob('0 0 * * 1', function () {
    resetRankingEveryWeek();
});
