import { Module } from '@nestjs/common';
import { DishesService } from './dishes.service';
import { DishesController } from './dishes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuCategory } from './entities/menu-category.entity';
import { Allergen } from './entities/allergens.entity';
import { Dish } from './entities/dish.entity';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';

@Module({
	imports: [TypeOrmModule.forFeature([MenuCategory, Allergen, Dish]), RestaurantsModule],
	controllers: [DishesController],
	providers: [DishesService],
})
export class DishesModule {}
