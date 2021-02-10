import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';
export class newUserDto {
  @IsOptional()
  @IsNotEmpty({ message: '用户名不能为空' })
  @Length(1, 10, { message: '用户名长度在1-10个字符之间' })
  username: string;

  @IsNotEmpty({ message: '密码不能为空' })
  password: string;

  intro: string;
}
export class updateUserDto extends newUserDto {
  @IsNotEmpty()
  id: number;
  @IsOptional()
  avatarSrc: string;

  @IsOptional()
  username: string;

  @IsOptional()
  password: string;

  @IsOptional()
  intro: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
