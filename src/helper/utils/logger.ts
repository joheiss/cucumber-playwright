import { createLogger, transports, format } from "winston";

export const options = (scenarioName: string) => {
  return {
    transports: [
      new transports.File({
        filename: `test-results/logs/${scenarioName}/log.log`,
        level: "info",
        format: format.combine(
          format.timestamp({ format: "DD.MM.YYYY HH:mm:ss" }),
          format.align(),
          format.printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message}`)
        ),
      }),
    ],
  };
};
