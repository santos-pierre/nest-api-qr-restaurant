import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { Dish } from 'src/dishes/entities/dish.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Restaurant, Dish])],
	controllers: [RestaurantsController],
	providers: [RestaurantsService],
	exports: [RestaurantsService],
})
export class RestaurantsModule {}
