import { ApiProperty } from "@nestjs/swagger";
import * as Joi from "joi";

export class GetChatDto {
  @ApiProperty()
  user: string;
}

export const getChatDTOValidator = Joi.object<GetChatDto>({
  user: Joi.string().hex().length(24).required(),
}).required();
