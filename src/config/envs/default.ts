import { Company, Contact, Profile, User } from 'src/common/entities';
import { Brand } from 'src/modules/brand/entities/brand.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { Department } from 'src/modules/location/entities/department.entity';
import { Town } from 'src/modules/location/entities/town.entity';
import { Pdv } from 'src/modules/pdv/entities/pdv.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { ProductPdv } from 'src/modules/products-pdvs/entities/product-pdv.entity';

export const config = {
  db: {
    entities: [
      User,
      Profile,
      Brand,
      Category,
      Company,
      Contact,
      Department,
      Town,
      Pdv,
      Product,
      ProductPdv,
    ],
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    schema: 'public',
  },
  smtp: {
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT, 10),
    secure: process.env.EMAIL_SECURE,
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
    from: process.env.EMAIL_FROM,
  },
  jwt: {
    secret: process.env.SECRET,
    expire_in: process.env.TOKEN_EXPIRE_IN,
  },
};
