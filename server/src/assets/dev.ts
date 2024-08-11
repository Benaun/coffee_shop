import { ConfigService } from "@nestjs/config";
import * as dotenv from "dotenv";

dotenv.config();

export const devMode = (configService: ConfigService) =>
  configService.get("NODE_ENV") === "development";

export const DEV_MODE = process.env.NODE_ENV === "development";
