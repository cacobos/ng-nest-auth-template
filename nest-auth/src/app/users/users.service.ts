import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { Roles } from '../auth/roles.enum';
import { ChangePasswordDTO, UserDTO } from './user-dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<any>) {}

  async findOne(username: string) {
    return await this.userModel.findOne({ username }).exec();
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async singup(createUserDTO: UserDTO): Promise<void> {
    const { username, password } = createUserDTO;
    const existingUser = await this.userModel
      .findOne({ $or: [{ username }] })
      .exec();

    if (existingUser) {
      throw new ConflictException('User with this id or email already exists');
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      username,
      password: passwordHash,
      roles: [Roles.ROLE_USER],
    });
    newUser.save();
  }

  async resetPassword(username: string) {
    const user = await this.findOne(username);
    if (!user) throw new NotFoundException({ message: 'User not found' });
    // send email with reset password link
    const password = user.username;
    const passwordHash = await bcrypt.hash(password, 10);
    await this.userModel.updateOne(
      {
        username: user.username,
      },
      {
        password: passwordHash,
      },
    );
    return { message: 'Password reset successfully' };
  }

  async changePassword(changePasswordDTO: ChangePasswordDTO) {
    const { username, oldPassword, newPassword } = changePasswordDTO;
    const user = await this.findOne(username);
    if (!user) throw new NotFoundException({ message: 'User not found' });
    console.log(oldPassword, user.password);
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) throw new UnauthorizedException();
    const passwordHash = await bcrypt.hash(newPassword, 10);
    await this.userModel.updateOne(
      {
        username: user.username,
      },
      {
        password: passwordHash,
      },
    );
    return { message: 'Password changed successfully' };
  }

  deleteUser(username: string) {
    return this.userModel.deleteOne({ username }).exec();
  }
}
