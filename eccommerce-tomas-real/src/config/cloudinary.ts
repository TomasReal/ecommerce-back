import { v2 } from 'cloudinary';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.development.env' });

export const CloudinaryConfig = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_CLOUD_API,
      api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
    });

    return v2;
  },
};
