import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CloudinaryfileService } from './cloudinaryfile.service';
import { CreateCloudinaryfileDto } from './dto/create-cloudinaryfile.dto';
import { UpdateCloudinaryfileDto } from './dto/update-cloudinaryfile.dto';
import { Res } from '@nestjs/common';
import cloudinary from '../shared/cloudinary.config';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/shared/multer.config';



@Controller('cloudinaryfile')
export class CloudinaryfileController {


  constructor(private readonly cloudinaryfileService: CloudinaryfileService,

  ) { }

  @Post('create')
  create(@Body() createCloudinaryfileDto: CreateCloudinaryfileDto) {
    return this.cloudinaryfileService.create(createCloudinaryfileDto);
  }

  @Get()
  findAll() {
    return this.cloudinaryfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cloudinaryfileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCloudinaryfileDto: UpdateCloudinaryfileDto) {
    return this.cloudinaryfileService.update(+id, updateCloudinaryfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cloudinaryfileService.remove(+id);
  }

  @Post('file')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: any, @Res() res: Response) {
    console.log("🚀 ~ file: cloudinaryfile.controller.ts:45 ~ CloudinaryfileController ~ uploadFile ~ body", body)
    console.log("🚀 ~ file: cloudinaryfile.controller.ts:45 ~ CloudinaryfileController ~ uploadFile ~ image", file)
    const data = await this.cloudinaryfileService.uploadFile(file, body)
    return res.json(data);
  }

}
