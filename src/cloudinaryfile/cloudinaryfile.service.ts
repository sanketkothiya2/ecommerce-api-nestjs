import { Injectable } from '@nestjs/common';
import { CreateCloudinaryfileDto } from './dto/create-cloudinaryfile.dto';
import { UpdateCloudinaryfileDto } from './dto/update-cloudinaryfile.dto';
import { InjectModel } from '@nestjs/mongoose';
import { cloud, cloudDocument } from '../schemas/cloud.schema';
import { Model } from 'mongoose';
import cloudinary from '../shared/cloudinary.config';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');





@Injectable()
export class CloudinaryfileService {
  constructor(@InjectModel('cloud') private readonly cloudModel: Model<cloudDocument>) { }

  create(createCloudinaryfileDto: CreateCloudinaryfileDto) {
    return 'This action adds a new cloudinaryfile';
  }

  findAll() {
    return `This action returns all cloudinaryfile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cloudinaryfile`;
  }

  update(id: number, updateCloudinaryfileDto: UpdateCloudinaryfileDto) {
    return `This action updates a #${id} cloudinaryfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} cloudinaryfile`;
  }

  async uploadFile(file, body) {
    const { name, description } = body;

    try {
      const result = await cloudinary.uploader.upload(file.path, {
        public_id: `${name}/${file.originalname}`,
      });

      const imageUrl = result.secure_url;

      // Save the file information to your database here
      const newProduct = new this.cloudModel()
      newProduct.name = name
      newProduct.description = description
      newProduct.file = imageUrl

      return newProduct.save()


    } catch (error) {
      console.error(error);
    }
  }

}
