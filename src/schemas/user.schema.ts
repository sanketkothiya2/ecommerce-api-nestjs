import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import { Role } from 'src/auth/enums/role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {

  
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;


  @Prop({ defaults: 'user' })
  roles: string;

  @Prop()
  refreshToken: string;

  @Prop({ type: 'date'})
  refreshTokenExp: string;

}

export const UserSchema = SchemaFactory.createForClass(User);