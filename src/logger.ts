import winston from "winston";

const format = winston.format.cli({
  colors: {
    info: "blue",
    error: "red",
    warn: "yellow",
  },
});

const logger = winston.createLogger({
  transports: [new winston.transports.Console({ format })],
});

export default logger;
