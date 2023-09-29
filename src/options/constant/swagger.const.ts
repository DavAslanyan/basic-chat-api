import { ApiResponseOptions } from "@nestjs/swagger";
import { JoiUnprocessableEntityExceptionArg } from "../pipe/joi/joi-unprocessable-entity.exception";

export const swaggerConst = {
  tag: {
    user: "USER",
    chat: "CHAT",
    message: "MESSAGE",
  },

  apiResponse: {
    unprocessableEntity: {
      description:
        "The request was invalid and/or malformed. The response will contain an Errors JSON Object with the specific errors",
      type: [JoiUnprocessableEntityExceptionArg],
    } as ApiResponseOptions,

    notFound: {
      description: "The object doesn't exist.",
    } as ApiResponseOptions,

    internalServerError: {
      description: "There was an internal error",
    } as ApiResponseOptions,

    forbidden: {
      description: "The request was not allow",
    } as ApiResponseOptions,
  },
};
