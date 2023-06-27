import { IsNotEmpty, MinLength } from "class-validator";

export class LoginDto {
  @IsNotEmpty({ message: "username cannot be empty" })
  username: string;

  @IsNotEmpty({ message: "password cannot be empty" })
  @MinLength(8, { message: "password minimal 8 character" })
  password: string;
}
