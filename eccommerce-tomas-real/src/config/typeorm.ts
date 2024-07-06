import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule, registerAs } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'process';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.development.env',
    }),
  ],
})
export class ConfigurationModule {}

export const dbConfig = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    database: configService.get('DB_NAME'),
    host: configService.get('DB_HOST'),
    port: parseInt(configService.get('DB_PORT')),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASS'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: false,
    logging: true,
    dropSchema: false,
  }),
});
