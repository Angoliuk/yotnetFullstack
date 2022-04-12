import { createLogger, transports, format } from "winston";

export const logger = createLogger({
  format: format.printf((info) => {
    return `[${info.level.toLocaleUpperCase()}] - ${info.message}`;
  }),
  level: "info",
  transports: [new transports.Console({ level: "info" })],
});
