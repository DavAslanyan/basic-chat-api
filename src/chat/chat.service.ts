import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Chat, ChatDocument } from "./schema/chat.schema";
import { CreateChatDto } from "./dto/create-chat.dto";
import * as mongoose from "mongoose";

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<ChatDocument>) {}

  async createChat(payload: CreateChatDto): Promise<ChatDocument> {
    const createdChat = await this.chatModel.create(payload);
    return this.chatModel.findById(createdChat._id).select("id");
  }

  getChatById(id) {
    return this.chatModel.findById(id);
  }

  getChatList(userId) {
    return this.chatModel.aggregate([
      { $match: { users: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: "users",
          localField: "users",
          foreignField: "_id",
          as: "users",
          pipeline: [
            {
              $project: {
                _id: 0,
                id: "$_id",
                username: "$username",
                createdAt: "$createdAt",
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "messages",
          localField: "_id",
          foreignField: "chat",
          as: "messages",
          pipeline: [{ $sort: { createdAt: 1 } }],
        },
      },
      {
        $set: {
          lastMessage: { $last: "$messages" },
        },
      },
      { $sort: { "lastMessage.createdAt": -1, createdAt: -1 } },
      {
        $project: {
          _id: 0,
          id: "$_id",
          name: "$name",
          users: "$users",
        },
      },
    ]);
  }
}
