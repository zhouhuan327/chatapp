import { IsNotEmpty } from "class-validator";
import { MessageType } from "share/types";

export class GroupMessageDto {
  @IsNotEmpty()
  senderId: number;
  @IsNotEmpty()
  groupId: number;
  @IsNotEmpty()
  content: any;
  @IsNotEmpty()
  type: MessageType;
}
