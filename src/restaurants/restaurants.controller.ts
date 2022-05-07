import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	Req,
	ValidationPipe,
	UsePipes,
	UseInterceptors,
	ClassSerializerInterceptor,
	NotFoundException,
	HttpCode,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestWithUser } from 'src/users/interface/RequestWithUser';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { OwnerResourceGuard } from 'src/guards/owner-resource.guard';

@Controller('restaurants')
@UseInterceptors(TransformInterceptor, ClassSerializerInterceptor)
export class RestaurantsController {
	constructor(private readonly restaurantsService: RestaurantsService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe({ transform: true }))
	async create(@Req() req: RequestWithUser, @Body() createRestaurantDto: CreateRestaurantDto) {
		return await this.restaurantsService.create(req.user, createRestaurantDto);
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(@Req() req: RequestWithUser) {
		return await this.restaurantsService.findAll(req.user.id);
	}

	@Get(':slug')
	@UseGuards(JwtAuthGuard, OwnerResourceGuard)
	async findOne(@Req() req: RequestWithUser, @Param('slug') slug: string) {
		const restaurant = await this.restaurantsService.findOneByUser(slug, req.user.id);

		if (!restaurant) {
			throw new NotFoundException();
		}

		return restaurant;
	}

	@Patch(':slug')
	@UseGuards(JwtAuthGuard, OwnerResourceGuard)
	@UsePipes(new ValidationPipe({ transform: true }))
	update(@Param('slug') slug: string, @Body() updateRestaurantDto: UpdateRestaurantDto) {
		return this.restaurantsService.update(slug, updateRestaurantDto);
	}

	@Delete(':slug')
	@HttpCode(204)
	@UseGuards(JwtAuthGuard, OwnerResourceGuard)
	remove(@Req() req: RequestWithUser, @Param('slug') slug: string) {
		return this.restaurantsService.remove(slug, req.user.id);
	}
}
