import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Cloudinary')
@ApiBearerAuth()
@Controller('upload')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post()
  @ApiOperation({ summary: 'Upload a file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File upload',
    // Swagger expects `type` to be `multipart/form-data`
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Photo uploaded correctly :)',
  })
  @ApiResponse({ status: 400, description: 'The format used is incorrect :s' })
  @ApiResponse({ status: 404, description: 'Photo not uploaded >(' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const uploadResult = await this.cloudinaryService.uploadImage(file);
    return {
      url: uploadResult.url,
      source_url: uploadResult.source_url,
    };
  }
}
