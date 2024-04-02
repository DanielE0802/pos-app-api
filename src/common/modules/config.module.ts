import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
import { JoiValidationSchema } from '../config/validation-schema/joi.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: JoiValidationSchema,
    }),
  ],
})
export class CustomConfigModule {}
