
import { CloudinaryfileService } from './cloudinaryfile.service';
import { CloudinaryfileController } from './cloudinaryfile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { cloudSchema } from '../schemas/cloud.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'cloud', schema: cloudSchema }])
  ],
  controllers: [CloudinaryfileController],
  providers: [CloudinaryfileService]
})
export class CloudinaryfileModule { }
