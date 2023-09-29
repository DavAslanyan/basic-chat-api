import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";
import { UserService } from "./user.service";
import { UserGetResponse } from "./response/user-get.response";
import { CreateUserDto, createUserDTOValidator } from "./dto/create-user.dto";
import { UserDocument } from "./schema/user.schema";
import { swaggerConst } from "../options/constant/swagger.const";
import { JoiValidationPipe } from "../options/pipe/joi/joi-validation.pipe";

@ApiUnprocessableEntityResponse(swaggerConst.apiResponse.unprocessableEntity)
@ApiInternalServerErrorResponse(swaggerConst.apiResponse.internalServerError)
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags(swaggerConst.tag.user)
  @ApiCreatedResponse({
    description: "User added",
    type: UserGetResponse,
  })
  @ApiConflictResponse()
  @Post("add")
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body(new JoiValidationPipe(createUserDTOValidator))
    userCreateDto: CreateUserDto,
  ): Promise<UserDocument> {
    return this.userService.createUser(userCreateDto);
  }
}
