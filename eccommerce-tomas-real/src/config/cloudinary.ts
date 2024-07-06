import { v2 } from 'cloudinary';
import { config as dotenvConfig } from 'dotenv';

// Cargar las variables de entorno desde el archivo .development.env
dotenvConfig({ path: '.development.env' });

export const CloudinaryConfig = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    // Configuración de Cloudinary
    v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_CLOUD_API,
      api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
    });

    return v2;
  },
};
