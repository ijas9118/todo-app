import winston from "winston";
import { env } from "../config/env";

const customColors = {
  error: "brightRed",
  warn: "brightYellow",
  info: "brightGreen",
  http: "brightCyan",
  debug: "brightBlue",
};

winston.addColors(customColors);

const ENV = env.NODE_ENV || "development";

const transports: winston.transport[] = [
  new winston.transports.Console({
    level: ENV === "development" ? "debug" : "info",
    format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
  }),
];

if (ENV !== "development") {
  transports.push(
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log", level: "info" })
  );
}

const logger = winston.createLogger({
  level: "http",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports,
});

export default logger;
