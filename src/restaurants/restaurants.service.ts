import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import slugify from 'slugify';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RestaurantsService {
	constructor(
		@InjectRepository(Restaurant) private readonly restaurantsRepository: Repository<Restaurant>,
	) {}
	async create(user: User, createRestaurantDto: CreateRestaurantDto) {
		return await this.restaurantsRepository.save({
			...createRestaurantDto,
			slug: slugify(createRestaurantDto.name),
			user_id: user,
		});
	}

	async findAll(user_id: string) {
		// return await this.restaurantsRepository.createQueryBuilder('restaurants').leftJoin('');
	}

	findOne(id: number) {
		return `This action returns a #${id} restaurant`;
	}

	update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
		return `This action updates a #${id} restaurant`;
	}

	remove(id: number) {
		return `This action removes a #${id} restaurant`;
	}
}
