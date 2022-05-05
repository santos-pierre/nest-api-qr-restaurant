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
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestWithUser } from 'src/users/interface/RequestWithUser';

@Controller('restaurants')
export class RestaurantsController {
	constructor(private readonly restaurantsService: RestaurantsService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe({ transform: true }))
	async create(@Req() req: RequestWithUser, @Body() createRestaurantDto: CreateRestaurantDto) {
		return await this.restaurantsService.create(req.user, createRestaurantDto);
	}

	@Get()
	async findAll(@Req() req: RequestWithUser) {
		return await this.restaurantsService.findAll(req.user.id);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.restaurantsService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateRestaurantDto: UpdateRestaurantDto) {
		return this.restaurantsService.update(+id, updateRestaurantDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.restaurantsService.remove(+id);
	}
}
