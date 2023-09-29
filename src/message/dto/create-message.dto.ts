import { ApiProperty } from "@nestjs/swagger";
import * as Joi from "joi";

export class CreateMessageDto {
  @ApiProperty()
  chat: string;
  @ApiProperty()
  author: string;
  @ApiProperty()
  text: string;
}

export const createMessageDTOValidator = Joi.object<CreateMessageDto>({
  chat: Joi.string().hex().length(24).required(),
  author: Joi.string().hex().length(24).required(),
  text: Joi.string().required(),
}).required();
