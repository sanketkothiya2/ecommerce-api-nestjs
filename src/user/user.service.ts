import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDTO } from '../dtos/create-user-dto';
import * as bcrypt from 'bcrypt';
import * as randomToken from 'rand-token';
import * as moment from 'moment';


@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) { }

  async addUser(createUserDTO: CreateUserDTO): Promise<User | any> {
    const useremail = await this.userModel.findOne({ email: createUserDTO.email });
    if (!useremail) {
      const newUser = await this.userModel.create(createUserDTO);
      newUser.password = await bcrypt.hash(newUser.password, 10);
      return newUser.save();
    }
    else {
      throw new HttpException(`this email ${createUserDTO.email} already exists`, HttpStatus.FORBIDDEN);
      // return { message: `this email ${createUserDTO.email} already exists`}
    }

  }

  async findUser(email: string) {
    const user = await this.userModel.findOne({ email: email });
    // console.log("🚀 ~ file: user.service.ts ~ line 28 ~ UserService ~ findUser ~ user", user)
    return user;
  }

  public async getRefreshToken(userId: number): Promise<string> {
    const userDataToUpdate = {
      refreshToken: randomToken.generate(16),
      refreshTokenExp: moment().day(1).format('YYYY/MM/DD'),
    };
   const data= await this.userModel.findByIdAndUpdate(userId, userDataToUpdate);
    console.log("🚀 ~ file: user.service.ts ~ line 41 ~ UserService ~ getRefreshToken ~ data", data)
    return userDataToUpdate.refreshToken;
}

public async validRefreshToken(
  email: string,
  refreshToken: string,
) {
  const currentDate = moment().day(1).format('YYYY/MM/DD');
  let user = await this.userModel.findOne({ email: email,refreshToken: refreshToken,refreshTokenExp: {$gt:currentDate}},
  ).select({username:1,email:1});

  if(user){
    return user
  }else{
    return {message:'somethings went wrong'}
  }
}}