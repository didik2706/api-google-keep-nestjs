import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.model';
import { ChangePasswordDto } from './dto/change-password.dto';
import { compareSync, hashSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private user: typeof User) {}
  
  async findOne(id: string): Promise<User> {
    return await this.user.findOne({
      attributes: {
        exclude: ["password"]
      },
      where: { id }
    })
  }

  async changePassword(id: string, changePasswordDto: ChangePasswordDto): Promise<void> {
    try {
      // checking existing password
      let currentPassword = await this.user.findOne({
        where: { id }
      });

      // check old password
      if (!compareSync(changePasswordDto.old_password, currentPassword.password)) {
        throw new BadRequestException("wrong old password, please check again");
      }

      // change password
      currentPassword.password = hashSync(changePasswordDto.new_password, 10);
      await currentPassword.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
