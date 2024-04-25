import { Company } from 'src/common/entities/company.entity';
import { Product } from 'src/common/entities/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @Column({ name: 'category_main_category_id' })
  categoryMainCategoryId: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_main_category_id' })
  categoryMainCategory: Category;

  @OneToMany(() => Category, (category) => category.categoryMainCategory)
  subcategories: Category[];

  @Column({ name: 'company_id', type: 'varchar', nullable: true })
  companyId: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  // auto columns
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}
