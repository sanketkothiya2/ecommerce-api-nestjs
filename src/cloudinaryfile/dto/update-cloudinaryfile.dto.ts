import { PartialType } from '@nestjs/mapped-types';
import { CreateCloudinaryfileDto } from './create-cloudinaryfile.dto';

export class UpdateCloudinaryfileDto extends PartialType(CreateCloudinaryfileDto) {}
