import mongoose from "mongoose";
const mongodburl = process.env.MONGO_URI;


if (!mongodburl) {
throw new Error("Please define the MONGO_URI environment variable inside .env.local")
}

let cache = global.mongoose;
if (!cache) {
    cache = global.mongoose = {conn: null, promise: null}
}

const connectDb = async () => {
    if (cache.conn) {
        return cache.conn;
    }
    if (!cache.promise) {
        cache.promise = mongoose.connect(mongodburl).then((conn) => conn.connection)
    }
    try {
        const conn = await cache.promise;
        return conn;
    } catch (error) {
        console.log(error)
    }
}


export default connectDb;