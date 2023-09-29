import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";

export type ChatDocument = Chat & Document;

@Schema({ timestamps: true })
export class Chat {
  @Prop({ unique: true, required: true })
  name: string;
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: "User", required: true })
  users: [mongoose.Schema.Types.ObjectId];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
