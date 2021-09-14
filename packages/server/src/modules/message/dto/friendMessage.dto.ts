import { IsNotEmpty } from "class-validator";
import { MessageType } from "share/types";

export class FriendMessageDto {
  @IsNotEmpty()
  senderId: number;
  @IsNotEmpty()
  receiverId: number;
  @IsNotEmpty()
  content: any;
  @IsNotEmpty()
  type: MessageType;
}
