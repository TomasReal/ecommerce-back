import { Module } from '@nestjs/common';

//APP
import { AppController } from './app.controller';
import { AppService } from './app.service';

//PRODUCTS
import { ProductsModule } from './modules/products/products.module';

//USER
import { UsersModule } from './modules/users/users.module';

//AUTH
import { AuthModule } from './modules/auth/auth.module';

//CLOUDINARY
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';

//CONFIG
import { ConfigurationModule, dbConfig } from './config/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CloudinaryModule,
    ProductsModule,
    UsersModule,
    AuthModule,
    dbConfig,
    ConfigurationModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
