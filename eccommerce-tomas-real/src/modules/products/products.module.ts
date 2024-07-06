import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Category } from '../categories/categories.entity';
import { DataLoadService } from './dataLoad.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [ProductsService, ProductsRepository, DataLoadService],
  controllers: [ProductsController],
  exports: [ProductsRepository, DataLoadService],
})
export class ProductsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('products');
  }
}
