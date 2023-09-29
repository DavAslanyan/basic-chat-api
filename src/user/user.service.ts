import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./schema/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(payload: CreateUserDto): Promise<UserDocument> {
    const createdUser = await this.userModel.create(payload);
    return this.userModel.findById(createdUser._id).select("id");
  }

  getUserById(id) {
    return this.userModel.findById(id);
  }
}
