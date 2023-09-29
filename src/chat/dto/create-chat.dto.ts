import { ApiProperty } from "@nestjs/swagger";
import * as Joi from "joi";

export class CreateChatDto {
  @ApiProperty()
  name: string;
  @ApiProperty({
    isArray: true,
  })
  users: string[];
}

export const createChatDTOValidator = Joi.object<CreateChatDto>({
  name: Joi.string().required(),
  users: Joi.array().items(Joi.string().hex().length(24)).min(1).unique(),
}).required();
