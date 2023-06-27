import { IsNotEmpty, IsString, Min, MinLength } from "class-validator";

export class RegisterDto {
  @IsNotEmpty({ message: "username cannot be empty" })
  username: string;

  @IsNotEmpty({ message: "password cannot be empty" })
  @MinLength(8, { message: "password minimal 8 character" })
  password: string;

  @IsNotEmpty({ message: "name cannot be empty" })
  @IsString()
  name: string;
}
