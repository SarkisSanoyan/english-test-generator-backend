import { createClient } from "redis";
import { config } from "./env.js";

if (!config.redisUri) {
    throw new Error("REDIS_URL is missing");
}

const redisClient = createClient({
    url: config.redisUri,
    socket: {
        reconnectStrategy: (retries) => {
            // Exponential backoff: 100ms, 200ms, 400ms, ... max 3000ms
            const delay = Math.min(retries * 100, 3000);
            console.log(`Redis reconnect attempt ${retries}, waiting ${delay}ms`); // auto-reconnect
            return delay;
        },
        connectTimeout: 10000, // 10 seconds
    },
});

redisClient.on("connect", () => console.log("Redis Connecting..."));
redisClient.on("ready", () => console.log("Redis Connected & Ready on:", process.env.REDIS_URL || config.redisUri));
redisClient.on("error", (err) => console.error("Redis Error:", err.message));
redisClient.on("reconnecting", () => console.log("Redis Reconnecting..."));
redisClient.on("end", () => { console.log("Redis: Connection closed") });

export const connectRedis = async () => {
    try {
        if (!redisClient.isOpen) {
            await redisClient.connect();
        } else {
            console.log("Redis: Already connected");
            console.log("REDIS_URL exists:", !!config.redisUri);
        }
    } catch (error) {
        console.error(":x: Redis Connection Failed:", error.message);
        console.error("Make sure Redis server is running on", config.redisUri || "redis://localhost:6379");
        process.exit(1); // Stop server if Redis fails (same as MongoDB)
    }
};

export const disconnectRedis = async () => {
    try {
        if (redisClient.isOpen) {
            await redisClient.quit(); // Graceful shutdown
            console.log(":wave: Redis: Disconnected gracefully");
        }
    } catch (error) {
        console.error(":x: Redis Disconnect Error:", error.message);
        await redisClient.disconnect(); // Force disconnect
    }
};

export const isRedisConnected = () => {
    return redisClient.isOpen && redisClient.isReady;
};

export const getRedisInfo = async () => {
    try {
        if (!isRedisConnected()) {
            return { connected: false };
        }
        const info = await redisClient.info();
        const dbSize = await redisClient.dbSize();
        return {
            connected: true,
            dbSize,
            info: info.split('\n').slice(0, 10).join('\n'), // First 10 lines
        };
    } catch (error) {
        return { connected: false, error: error.message };
    }
};

export default redisClient; 