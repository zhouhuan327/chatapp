import { IsNotEmpty } from 'class-validator';

export class registerDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}
