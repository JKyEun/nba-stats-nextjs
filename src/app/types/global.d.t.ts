export {};

declare global {
    var _mongo: Promise<MongoClient> | undefined;
}
