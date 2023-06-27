import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller({
  path: "auth",
  version: "1"
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @HttpCode(201)
  async register(@Body() registerDto: RegisterDto) {
    await this.authService.register(registerDto);

    return {
      status: "success",
      message: "user successfully registered"
    }
  }

  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    const access_token = await this.authService.login(loginDto);

    return {
      status: "success",
      message: "user successfully login",
      access_token: "Bearer " + access_token
    }
  }
}
