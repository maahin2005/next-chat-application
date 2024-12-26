// redisClient.js
// import Redis from "ioredis";

// const redis = new Redis(process.env.REDIS_URL); // Connect to Redis instance

import { createClient } from 'redis';

const redisClient = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_SOCKET_HOST,
        port: process.env.REDIS_PORT
    }
});

redisClient.on('error', err => console.log('Redis Client Error', err));

await redisClient.connect();

// await client.set('foo', 'bar');
// const result = await client.get('foo');
// console.log(result)  // >>> bar

export default redisClient;