import { ConfigModule, ConfigService } from "@nestjs/config";
import { MONGODB_URI } from "../constant/env-key.const";
import * as mongooseToJson from "@meanie/mongoose-to-json";

export const mongooseModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => {
    const mongodb_URI =
      configService.get(MONGODB_URI) || "mongodb://127.0.0.1/chat";
    return {
      uri: mongodb_URI,
      connectionFactory: (connection) => {
        connection.plugin(mongooseToJson);
        return connection;
      },
    };
  },
  inject: [ConfigService],
};
