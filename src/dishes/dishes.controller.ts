import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseInterceptors,
	ClassSerializerInterceptor,
	UsePipes,
	UseGuards,
	Req,
	NotFoundException,
	HttpCode,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OwnerDishGuard } from 'src/guards/owner-dishes.guard';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { CustomValidationPipe } from 'src/pipes/custom-validation.pipe';
import { RestaurantsService } from 'src/restaurants/restaurants.service';
import { RequestWithUser } from 'src/users/interface/RequestWithUser';
import { DishesService } from './dishes.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { DishRestaurantParam } from './dto/dish-restaurant-param.dto';
import { UpdateDishDto } from './dto/update-dish.dto';

@Controller('restaurants/:restaurant_id/dishes')
@UseInterceptors(TransformInterceptor, ClassSerializerInterceptor)
export class DishesController {
	constructor(
		private readonly dishesService: DishesService,
		private readonly restaurantsService: RestaurantsService,
	) {}

	@Post()
	@UseGuards(JwtAuthGuard, OwnerDishGuard)
	@UsePipes(new CustomValidationPipe({ transform: true }))
	async create(
		@Req() req: RequestWithUser,
		@Body() createDishDto: CreateDishDto,
		@Param() { restaurant_id }: DishRestaurantParam,
	) {
		const restaurant = await this.restaurantsService.findOneByUser(restaurant_id, req.user.id);

		if (!restaurant) {
			throw new NotFoundException('Restaurant not found');
		}

		return this.dishesService.create(restaurant.id, createDishDto);
	}

	@Get()
	@UseGuards(JwtAuthGuard, OwnerDishGuard)
	async findAll(@Req() req: RequestWithUser, @Param('restaurant_id') restaurant_id: string) {
		const restaurant = await this.restaurantsService.findOneByUser(restaurant_id, req.user.id);

		if (!restaurant) {
			throw new NotFoundException('Restaurant not found');
		}

		return await this.dishesService.findAll(restaurant.id);
	}

	@Get(':slug')
	@UseGuards(JwtAuthGuard, OwnerDishGuard)
	async findOne(
		@Req() req: RequestWithUser,
		@Param('restaurant_id') restaurant_id: string,
		@Param('slug') slug: string,
	) {
		const restaurant = await this.restaurantsService.findOneByUser(restaurant_id, req.user.id);

		if (!restaurant) {
			throw new NotFoundException('Restaurant not found');
		}

		const dish = await this.dishesService.findOne(restaurant.id, slug);

		if (!dish) {
			throw new NotFoundException('Dish Not found');
		}

		return dish;
	}

	@Patch(':slug')
	@UseGuards(JwtAuthGuard, OwnerDishGuard)
	@UsePipes(new CustomValidationPipe({ transform: true }))
	@HttpCode(204)
	async update(
		@Req() req: RequestWithUser,
		@Param('restaurant_id') restaurant_id: string,
		@Param('slug') slug: string,
		@Body() updateDishDto: UpdateDishDto,
	) {
		const restaurant = await this.restaurantsService.findOneByUser(restaurant_id, req.user.id);

		if (!restaurant) {
			throw new NotFoundException('Restaurant not found');
		}

		return this.dishesService.update(restaurant.id, slug, updateDishDto);
	}

	@Delete(':slug')
	@UseGuards(JwtAuthGuard)
	@HttpCode(204)
	async remove(
		@Req() req: RequestWithUser,
		@Param('restaurant_id') restaurant_id: string,
		@Param('slug') slug: string,
	) {
		const restaurant = await this.restaurantsService.findOneByUser(restaurant_id, req.user.id);

		if (!restaurant) {
			throw new NotFoundException('Restaurant not found');
		}

		return await this.dishesService.remove(restaurant.id, slug);
	}
}
