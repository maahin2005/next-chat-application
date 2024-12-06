// Import the mongoose library
import mongoose, { Mongoose } from "mongoose";

// Define the MongoDB connection string
const MONGODB_URI: string = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// Define a global variable to cache the connection
interface Cached {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Declare a global variable for caching the connection
const globalWithMongoose = global as typeof globalThis & {
  _mongooseCache?: Cached;
};

// Initialize the global cache if not already present
if (!globalWithMongoose._mongooseCache) {
  globalWithMongoose._mongooseCache = { conn: null, promise: null };
}

const cached = globalWithMongoose._mongooseCache;

export async function connectDB(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
