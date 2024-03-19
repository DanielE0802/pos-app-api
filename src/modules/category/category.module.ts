import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CategoryProviders } from './providers/category.providers';
import { PassportModule } from '@nestjs/passport';
import { DefaultStrategy } from 'src/common/constants/app/jwt.app';

@Module({
  imports: [
    PassportModule.register(DefaultStrategy),
    TypeOrmModule.forFeature([Category]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, ...CategoryProviders],
  exports: [CategoryService],
})
export class CategoryModule {}
