import * as dotenv from "dotenv";

export const getEnvironment = () => {
  dotenv.config({
    override: true,
    path: `./src/helper/env/.env.${process.env.STAGE || "prod"}`,
  });
};
