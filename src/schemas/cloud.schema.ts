import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Item } from './item.schema';

export type cloudDocument = cloud & Document;

@Schema()
export class cloud {

  @Prop()
  file: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

}

export const cloudSchema = SchemaFactory.createForClass(cloud);