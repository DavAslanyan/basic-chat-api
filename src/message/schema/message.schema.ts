import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true })
  chat: mongoose.Schema.Types.ObjectId;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
  author: mongoose.Schema.Types.ObjectId;
  @Prop({ type: String })
  text: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
