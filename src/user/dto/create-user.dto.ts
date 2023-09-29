import { ApiProperty } from "@nestjs/swagger";
import * as Joi from "joi";

export class CreateUserDto {
  @ApiProperty()
  username: string;
}

export const createUserDTOValidator = Joi.object<CreateUserDto>({
  username: Joi.string().required(),
}).required();
