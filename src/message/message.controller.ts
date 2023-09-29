import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
} from "@nestjs/common";
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";
import { MessageService } from "./message.service";
import { MessageGetResponse } from "./response/message-get.response";
import {
  CreateMessageDto,
  createMessageDTOValidator,
} from "./dto/create-message.dto";
import { MessageDocument } from "./schema/message.schema";
import { swaggerConst } from "../options/constant/swagger.const";
import { JoiValidationPipe } from "../options/pipe/joi/joi-validation.pipe";
import { UserService } from "../user/user.service";
import { GetMessageDto, getMessageDTOValidator } from "./dto/get-message.dto";
import { ChatService } from "../chat/chat.service";

@ApiUnprocessableEntityResponse(swaggerConst.apiResponse.unprocessableEntity)
@ApiInternalServerErrorResponse(swaggerConst.apiResponse.internalServerError)
@ApiNotFoundResponse(swaggerConst.apiResponse.notFound)
@Controller("messages")
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly userService: UserService,
    private readonly chatService: ChatService,
  ) {}

  @ApiTags(swaggerConst.tag.message)
  @ApiCreatedResponse({
    description: "Message added",
    type: MessageGetResponse,
  })
  @ApiConflictResponse()
  @ApiForbiddenResponse(swaggerConst.apiResponse.forbidden)
  @Post("add")
  @HttpCode(HttpStatus.CREATED)
  async createMessage(
    @Body(new JoiValidationPipe(createMessageDTOValidator))
    createMessageDto: CreateMessageDto,
  ): Promise<MessageDocument> {
    const chatIsExist = await this.chatService.getChatById(
      createMessageDto.chat,
    );
    if (!chatIsExist) {
      throw new NotFoundException(
        `chat with id "${createMessageDto.chat}" not found`,
      );
    }
    const userIsExist = await this.userService.getUserById(
      createMessageDto.author,
    );
    if (!userIsExist) {
      throw new NotFoundException(
        `user with id "${createMessageDto.author}" not found`,
      );
    }
    if (!chatIsExist.users.includes(userIsExist.id)) {
      throw new ForbiddenException("the chat is not available for this user");
    }
    return this.messageService.createMessage(createMessageDto);
  }

  @ApiTags(swaggerConst.tag.message)
  @ApiCreatedResponse({
    description: "Messages list",
    type: MessageGetResponse,
  })
  @Post("get")
  @HttpCode(HttpStatus.OK)
  async getMessageList(
    @Body(new JoiValidationPipe(getMessageDTOValidator))
    messageGetDto: GetMessageDto,
  ): Promise<MessageDocument[]> {
    const userIsExist = await this.chatService.getChatById(messageGetDto.chat);
    if (!userIsExist) {
      throw new NotFoundException(
        `chat whit "${messageGetDto.chat}" this id is not found`,
      );
    }
    return this.messageService.getMessageList(messageGetDto.chat);
  }
}
