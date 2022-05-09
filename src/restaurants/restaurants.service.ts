import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import slugify from 'slugify';
import { User } from 'src/users/entities/user.entity';
import { Dish } from 'src/dishes/entities/dish.entity';

@Injectable()
export class RestaurantsService {
	constructor(
		@InjectRepository(Restaurant) private readonly restaurantsRepository: Repository<Restaurant>,
		@InjectRepository(Dish) private readonly dishesRepository: Repository<Dish>,
	) {}
	async create(user: User, createRestaurantDto: CreateRestaurantDto) {
		try {
			const newRestaurant = await this.restaurantsRepository.save({
				...createRestaurantDto,
				slug: slugify(createRestaurantDto.name, { lower: true }),
				user_id: user,
			});
			return newRestaurant;
		} catch (error) {
			if (error.code === '23505') {
				throw new UnprocessableEntityException({
					name: 'This restaurant name already exist',
				});
			}
		}
	}

	async findAll(user_id: string): Promise<[Restaurant[], number]> {
		return await this.restaurantsRepository.findAndCount({
			where: { user_id: { id: user_id } },
			relations: { user_id: true, dishes: true },
		});
	}

	async findOneByUser(slug: string, user_id: string) {
		const restaurant = await this.restaurantsRepository
			.createQueryBuilder('restaurants')
			.leftJoinAndSelect('restaurants.user_id', 'users')
			.leftJoinAndSelect('restaurants.dishes', 'dishes')
			.where('restaurants.user_id = :user_id', { user_id })
			.andWhere('restaurants.slug = :slug', { slug })
			.getOne();

		const dishes = await this.dishesRepository.find({
			where: { restaurant_id: restaurant.id },
			relations: {
				allergens: true,
				menu_category_id: true,
			},
		});

		restaurant.dishes = dishes;

		return restaurant;
	}

	async findOne(slug: string) {
		return await this.restaurantsRepository.findOne({
			where: { slug },
			relations: { user_id: true, dishes: true },
		});
	}

	async update(slug: string, updateRestaurantDto: UpdateRestaurantDto) {
		const restaurant = await this.restaurantsRepository.findOneBy({ slug });

		if (!restaurant) {
			throw new NotFoundException();
		}

		try {
			const updatedRestaurant = await this.restaurantsRepository.save({
				id: restaurant.id,
				user_id: restaurant.user_id,
				slug: slugify(updateRestaurantDto.name, { lower: true }),
				...updateRestaurantDto,
			});
			return updatedRestaurant;
		} catch (error) {
			if (error.code === '23505') {
				throw new UnprocessableEntityException({ name: 'This restaurant name already exist' });
			}
		}
	}

	async remove(slug: string, user_id: string) {
		const restaurant = await this.restaurantsRepository.findOne({
			where: { slug, user_id: { id: user_id } },
			select: ['id'],
		});
		if (!restaurant) {
			throw new NotFoundException();
		}

		await this.restaurantsRepository.delete({ id: restaurant.id });
	}
}
