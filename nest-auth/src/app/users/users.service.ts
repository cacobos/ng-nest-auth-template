import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { Roles } from '../auth/roles.enum';
import { UserDTO } from './user-dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<any>) {}

  async findOne(username: string) {
    return await this.userModel.findOne({ username }).exec();
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
}
