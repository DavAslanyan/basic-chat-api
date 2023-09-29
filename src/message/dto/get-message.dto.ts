import { ApiProperty } from "@nestjs/swagger";
import * as Joi from "joi";

export class GetMessageDto {
  @ApiProperty()
  chat: string;
}

export const getMessageDTOValidator = Joi.object<GetMessageDto>({
  chat: Joi.string().hex().length(24).required(),
}).required();
