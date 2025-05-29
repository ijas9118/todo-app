import { createClient } from "redis";
import logger from "./logger";

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

const redisClient = createClient({
  url: redisUrl,
});

redisClient.on("error", (err) => {
  logger.error(`Redis Client Error: ${err.message}`, { error: err });
});

async function connectRedis() {
  if (!redisClient.isOpen) {
    try {
      await redisClient.connect();
      logger.info("Redis connected successfully");
    } catch (err) {
      logger.error("Redis connection failed", { error: err });
      throw err;
    }
  }
}

export { redisClient, connectRedis };
