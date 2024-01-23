import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/product/product.module';
import { LocationModule } from './modules/location/location.module';
import { CompanyModule } from './modules/company/company.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { ConfigModule } from '@nestjs/config';
import { JoiValidationSchema } from './config/validations/joi.validation';
import { TypeORMModule } from './config/database/typeorm.module';

const configModules = [
  TypeORMModule,
  ConfigModule.forRoot({
    validationSchema: JoiValidationSchema,
  }),
  // ServeStaticModule.forRoot({
  //   rootPath: join(__dirname, '..', 'public'),
  // }),
];

@Module({
  imports: [
    ...configModules,
    AuthModule,
    ContactsModule,
    ProductModule,
    LocationModule,
    CompanyModule,
  ],
})
export class AppModule {}
