const winston = require("winston");

const logger = winston.createLogger({
  level: "info",

  transports: [
    new winston.transports.Console(),

    new winston.transports.File({
      filename: "errors.log",
      level: "error",
    }),
  ],
});

module.exports = logger;
