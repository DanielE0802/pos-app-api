import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '../validations/configuration';
import { JoiValidationSchema } from '../validations/joi.validation';

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
