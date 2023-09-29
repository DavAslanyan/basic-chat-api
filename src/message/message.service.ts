import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Message, MessageDocument } from "./schema/message.schema";
import { CreateMessageDto } from "./dto/create-message.dto";
import * as mongoose from "mongoose";

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async createMessage(payload: CreateMessageDto): Promise<MessageDocument> {
    const createdMessage = await this.messageModel.create(payload);
    return this.messageModel.findById(createdMessage._id).select("id");
  }

  getMessageList(chatId) {
    return this.messageModel.aggregate([
      { $match: { chat: new mongoose.Types.ObjectId(chatId) } },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
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
      { $unwind: "$author" },
      { $sort: { createdAt: -1 } },
      {
        $project: {
          _id: 0,
          id: "$_id",
          text: "$text",
          author: "$author",
        },
      },
    ]);
  }
}
