import { Module } from '@nestjs/common';
import { CloudinaryConfig } from '../../config/cloudinary';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryController } from './cloudinary.controller';

@Module({
  controllers: [CloudinaryController],
  providers: [CloudinaryConfig, CloudinaryService],
})
export class CloudinaryModule {}

