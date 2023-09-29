import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
} from "@nestjs/common";
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";
import { ChatService } from "./chat.service";
import { ChatGetResponse } from "./response/chat-get.response";
import { CreateChatDto, createChatDTOValidator } from "./dto/create-chat.dto";
import { ChatDocument } from "./schema/chat.schema";
import { swaggerConst } from "../options/constant/swagger.const";
import { JoiValidationPipe } from "../options/pipe/joi/joi-validation.pipe";
import { UserService } from "../user/user.service";
import { GetChatDto, getChatDTOValidator } from "./dto/get-chat.dto";

@ApiUnprocessableEntityResponse(swaggerConst.apiResponse.unprocessableEntity)
@ApiInternalServerErrorResponse(swaggerConst.apiResponse.internalServerError)
@ApiNotFoundResponse(swaggerConst.apiResponse.notFound)
@Controller("chats")
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly userService: UserService,
  ) {}

  @ApiTags(swaggerConst.tag.chat)
  @ApiCreatedResponse({
    description: "Chat added",
    type: ChatGetResponse,
  })
  @ApiConflictResponse()
  @Post("add")
  @HttpCode(HttpStatus.CREATED)
  async createChat(
    @Body(new JoiValidationPipe(createChatDTOValidator))
    chatCreateDto: CreateChatDto,
  ): Promise<ChatDocument> {
    for (const user of chatCreateDto.users) {
      const userIsExist = await this.userService.getUserById(user);
      if (!userIsExist) {
        throw new NotFoundException(`user with id: "${user}" not found`);
      }
    }
    return this.chatService.createChat(chatCreateDto);
  }

  @ApiTags(swaggerConst.tag.chat)
  @ApiCreatedResponse({
    description: "Chat list",
    type: ChatGetResponse,
  })
  @Post("get")
  @HttpCode(HttpStatus.OK)
  async getChatList(
    @Body(new JoiValidationPipe(getChatDTOValidator))
    chatGetDto: GetChatDto,
  ): Promise<ChatDocument[]> {
    const userIsExist = await this.userService.getUserById(chatGetDto.user);
    if (!userIsExist) {
      throw new NotFoundException(
        `user with id: "${chatGetDto.user}" not found`,
      );
    }
    return this.chatService.getChatList(chatGetDto.user);
  }
}
