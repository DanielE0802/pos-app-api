import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import configuration from '../config/configuration';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [configuration.KEY],
      useFactory: async (configService: ConfigType<typeof configuration>) => {
        return {
          type: 'mysql',
          host: configService.DATABASE.HOST,
          port: parseInt(configService.DATABASE.PORT),
          username: configService.DATABASE.USER,
          password: configService.DATABASE.PASSWORD,
          database: configService.DATABASE.NAME,
          autoLoadEntities: true,
          synchronize: configService.DATABASE.SYNC,
          charset: 'UTF8',
          entities: [],
        };
      },
      async dataSourceFactory(options) {
        if (!options) throw new Error('Invalid options passed');
        return addTransactionalDataSource(
          await new DataSource(options).initialize(),
        );
      },
    }),
  ],
})
export class TypeORMModule {}
