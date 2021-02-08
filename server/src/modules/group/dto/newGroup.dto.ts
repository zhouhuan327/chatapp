import { IsNotEmpty, Length } from 'class-validator';

export class newGroupDto {
  @IsNotEmpty()
  @Length(1, 10, { message: '群名长度在1-6个字符之间' })
  groupName: string;

  @IsNotEmpty()
  groupManagerId: number;

  @Length(1, 10, { message: '群介绍长度在1-20个字符之间' })
  intro: string;
}
