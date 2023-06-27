import { IsNotEmpty, MinLength } from "class-validator";

export class ChangePasswordDto {
  @IsNotEmpty({ message: "old password cannot be null" })
  @MinLength(8, { message: "old password minimal 8 character" })
  old_password: string;

  @IsNotEmpty({ message: "new password cannot be null" })
  @MinLength(8, { message: "new password minimal 8 character" })
  new_password: string;
}