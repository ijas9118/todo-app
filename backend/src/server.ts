import "reflect-metadata";
import http from "http";
import app from "./app";
import logger from "./utils/logger";
import { connectRedis } from "./utils/redisClient";

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await connectRedis();

    const server = http.createServer(app);

    server.listen(PORT, () => {
      logger.info(`Server listening on port ${PORT}`);
    });

    // Graceful shutdown
    const shutdown = () => {
      logger.info("Shutting down server...");
      server.close(() => {
        logger.info("Server closed. Exiting process.");
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (err) {
    logger.error("Failed to start server", { error: err });
    process.exit(1);
  }
})();
