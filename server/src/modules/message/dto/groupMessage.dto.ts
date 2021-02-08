import { IsNotEmpty } from 'class-validator';

export class GroupMessageDto {
  @IsNotEmpty()
  userId: number;
  @IsNotEmpty()
  groupId: number;
  @IsNotEmpty()
  content: any;
  @IsNotEmpty()
  type: MessageType;
}
