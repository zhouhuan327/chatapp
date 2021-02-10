import { IsNotEmpty } from 'class-validator';

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
