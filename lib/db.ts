// import mongoose from "mongoose";
// const mongodburl = process.env.MONGO_URI;

// if (!mongodburl) {
//   throw new Error(
//     "Please define the MONGO_URI environment variable inside .env.local",
//   );
// }

// let cache = global.mongoose;
// if (!cache) {
//   cache = global.mongoose = { conn: null, promise: null };
// }

// const connectDb = async () => {
//   if (cache.conn) {
//     return cache.conn;
//   }
//   if (!cache.promise) {
//     cache.promise = mongoose
//       .connect(mongodburl, {
//         serverSelectionTimeoutMS: 3000,
//         socketTimeoutMS: 3000,
//         connectTimeoutMS: 3000,
//       })
//       .then((conn) => conn.connection);
//   }
//   try {
//     const conn = await cache.promise;
//     return conn;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export default connectDb;

import mongoose from "mongoose";

const mongodburl = process.env.MONGO_URI;

if (!mongodburl) {
  throw new Error(
    "Please define the MONGO_URI environment variable inside .env.local",
  );
}

let cache = global.mongoose;

if (!cache) {
  cache = global.mongoose = { conn: null, promise: null };
}

const connectDb = async () => {
  // 1. Return active connection if it exists
  if (cache.conn) {
    return cache.conn;
  }

  // 2. If no connection exists and no promise is pending, create a new one
  if (!cache.promise) {
    const opts = {
      bufferCommands: false,
      // REMOVED: serverSelectionTimeoutMS: 3000 (Too short!)
      // Default is 30000 (30s), which is much safer.
    };

    cache.promise = mongoose.connect(mongodburl, opts).then(() => {
      return mongoose.connection;
    });
  }

  // 3. Await the promise
  try {
    cache.conn = await cache.promise;
  } catch (e) {
    // CRITICAL FIX: If connection fails, reset promise so we can try again next time
    cache.promise = null;
    throw e;
  }

  return cache.conn;
};

export default connectDb;
