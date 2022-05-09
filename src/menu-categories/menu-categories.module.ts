import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuCategory } from 'src/dishes/entities/menu-category.entity';
import { MenuCategoriesController } from './menu-categories.controller';
import { MenuCategoriesService } from './menu-categories.service';

@Module({
	imports: [TypeOrmModule.forFeature([MenuCategory])],
	controllers: [MenuCategoriesController],
	providers: [MenuCategoriesService],
})
export class MenuCategoriesModule {}
