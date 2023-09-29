import { ApiProperty } from "@nestjs/swagger";

export class MessageGetResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty({
    isArray: true,
  })
  users: string;
  @ApiProperty()
  createdAt: string;
  @ApiProperty()
  updatedAt: string;
}
