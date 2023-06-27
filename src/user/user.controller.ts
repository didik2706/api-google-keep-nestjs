import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller({
  version: '1',
  path: 'user'
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('info')
  async userInfo(@Request() req) {
    return await this.userService.findOne(req.user.id)
  }

  @UseGuards(AuthGuard)
  @Patch('change-password')
  async updateProfile(@Request() req, @Body() changePasswordDto: ChangePasswordDto) {
    await this.userService.changePassword(req.user.id, changePasswordDto);

    return {
      status: "success",
      message: "password successfully changed"
    }
  }
}
