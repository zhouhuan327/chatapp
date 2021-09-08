import { IsNotEmpty } from "class-validator";

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
