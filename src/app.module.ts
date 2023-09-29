import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { mongooseModuleAsyncOptions } from "./options/mongoose/mongoose-module-async.options";
import { UserModule } from "./user/user.module";
import { ChatModule } from "./chat/chat.module";
import { MessageModule } from "./message/message.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync(mongooseModuleAsyncOptions),
    UserModule,
    ChatModule,
    MessageModule,
  ],
})
export class AppModule {}
