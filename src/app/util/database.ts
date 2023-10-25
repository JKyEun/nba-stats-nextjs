import { MongoClient } from 'mongodb';

const url = process.env.NEXT_PUBLIC_MONGO_CODE;

if (!url) {
    throw new Error('The MONGODB_URL environment variable is not defined');
}

let connectDB: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
    if (!global._mongo) {
        global._mongo = new MongoClient(url).connect();
    }
    connectDB = global._mongo;
} else {
    connectDB = new MongoClient(url).connect();
}
export { connectDB };
