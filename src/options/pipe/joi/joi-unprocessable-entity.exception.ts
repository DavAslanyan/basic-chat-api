import { ValidationErrorItem, Context } from "joi";
import { HttpException, HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class JoiUnprocessableEntityException extends HttpException {
  constructor(arg: JoiUnprocessableEntityExceptionArg[]) {
    super(arg, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}

abstract class JoiUnprocessableEntityExceptionItemContext implements Context {
  @ApiProperty({ example: "username" })
  key?: string | undefined;

  @ApiProperty({ example: "username" })
  label?: string | undefined;

  @ApiProperty({ example: "user123" })
  value?: any;

  [key: string]: any;
}

export abstract class JoiUnprocessableEntityExceptionArg
  implements ValidationErrorItem
{
  @ApiProperty({ example: '"username" must be a valid' })
  message: string;

  @ApiProperty({ example: "string.username" })
  type: string;

  @ApiProperty({ example: ["username"] })
  path: Array<string | number>;

  @ApiProperty()
  context?: JoiUnprocessableEntityExceptionItemContext;
}
