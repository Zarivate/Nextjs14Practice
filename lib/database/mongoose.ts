// Handles connecting to the Mongo database
import mongoose, { Mongoose } from "mongoose";
const uri = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// NextJs handles dataabse connections/requests slightly differently than more traditional applications where for each and every request/server action
// a connection to the database has to be made. NextJs runs in a serverless environment, meaning it's stateless so every time it starts up to handle a
// request and then shuts down right after so as to not maintain a constant connection to a database. Meaning every request is handled independently
// so there's no need to handle persistent connections across many instances. Optimization is essentially for this however to ensure proper scaling and
// flexibility else too many connections are open for every action done on the server side. This is where caching connections comes in to play.
let cached: MongooseConnection = (global as any).mongoose;

// Check to see if it's cached or not, If not means the file is being called for the first time, c
if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectToDatabase = async () => {
  // If a connection is already cached, then just return it and exit function
  if (cached.conn) return cached.conn;

  if (!uri) throw new Error("MONGODB_URL is undefined");

  // If a connection isn't already cached, then cache it/make a new one to the database
  cached.promise =
    cached.promise ||
    mongoose.connect(uri, { dbName: "VoidBoard", bufferCommands: false });

  cached.conn = await cached.promise;

  return cached.conn;
};
