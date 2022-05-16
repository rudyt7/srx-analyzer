const winston = require("winston");
const { combine, timestamp, label, printf } = winston.format;
var path = require("path");

const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), winston.format.json()),
  defaultMeta: { service: "user-service" },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({
      filename: path.join(__dirname, "logs", "Node", "error.log"),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "logs", "Node", "combined.log"),
    }),
  ],
});

module.exports = logger;
