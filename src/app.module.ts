import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { CloudinaryfileModule } from './cloudinaryfile/cloudinaryfile.module';

@Module({

  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/store'),
    ProductModule, UserModule, AuthModule, CartModule, CloudinaryfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

