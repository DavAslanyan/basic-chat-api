import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MessageController } from "./message.controller";
import { MessageService } from "./message.service";
import { Message, MessageSchema } from "./schema/message.schema";
import { UserModule } from "../user/user.module";
import { ChatModule } from "../chat/chat.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    UserModule,
    ChatModule,
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
