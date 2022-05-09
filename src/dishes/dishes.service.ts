import { HttpStatus, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import slugify from 'slugify';
import { DataSource, Repository } from 'typeorm';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { Allergen } from './entities/allergens.entity';
import { Dish } from './entities/dish.entity';

@Injectable()
export class DishesService {
	constructor(
		@InjectRepository(Dish) private readonly dishesService: Repository<Dish>,
		@InjectConnection() private dataSource: DataSource,
	) {}

	private mapAllergenIds(allergensIds: string[]): Allergen[] {
		return allergensIds.map((id: string) => {
			const allergen = new Allergen();
			allergen.id = id;
			return allergen;
		});
	}
	async create(restaurant_id: string, createDishDto: CreateDishDto) {
		const queryRunner = this.dataSource.createQueryRunner();

		await queryRunner.connect();
		await queryRunner.startTransaction();
		try {
			const dishData = plainToInstance(Dish, {
				...createDishDto,
				restaurant_id,
				allergens: this.mapAllergenIds(createDishDto.allergens),
				slug: slugify(createDishDto.name, { lower: true }),
			});

			const newDish = await queryRunner.manager.save(dishData);

			await queryRunner.commitTransaction();

			const dishCreated = await this.findOne(newDish.restaurant_id, newDish.slug);

			return dishCreated;
		} catch (error) {
			await queryRunner.rollbackTransaction();
			if (error.code === '23505') {
				throw new UnprocessableEntityException({
					status: HttpStatus.UNPROCESSABLE_ENTITY,
					errors: { name: ['This Dish name already exist'] },
				});
			}
		} finally {
			await queryRunner.release();
		}
	}

	async findAll(restaurant_id: string) {
		return await this.dishesService.findAndCount({
			where: { restaurant_id },
			relations: { allergens: true, menu_category_id: true },
		});
	}

	async findOne(restaurant_id: string, slug: string) {
		return await this.dishesService.findOne({
			where: { slug, restaurant_id },
			relations: { allergens: true, menu_category_id: true, restaurant_id: true },
		});
	}

	async update(restaurant_id: string, slug: string, updateDishDto: UpdateDishDto) {
		const queryRunner = this.dataSource.createQueryRunner();

		await queryRunner.connect();
		await queryRunner.startTransaction();
		try {
			const dishToUpdate = await this.dishesService.findOne({
				where: { slug, restaurant_id },
				select: ['id', 'published'],
			});

			const dish = this.dishesService.create({
				id: dishToUpdate.id,
				name: updateDishDto.name,
				slug: slugify(updateDishDto.name, { lower: true }),
				price: updateDishDto.price,
				published: updateDishDto.publish ? updateDishDto.publish : dishToUpdate.published,
				description: updateDishDto.description,
				menu_category_id: updateDishDto.menu_category_id,
				allergens: this.mapAllergenIds(updateDishDto.allergens),
				restaurant_id,
			});

			const updatedDish = await this.dishesService.save(dish);

			await queryRunner.commitTransaction();
			return updatedDish;
		} catch (error) {
			await queryRunner.rollbackTransaction();
			if (error.code === '23505') {
				throw new UnprocessableEntityException({ name: 'This Dish name already exist' });
			}
		} finally {
			await queryRunner.release();
		}
	}

	async remove(restaurant_id: string, slug: string) {
		const { id } = await this.dishesService.findOne({
			where: { slug, restaurant_id },
			select: ['id'],
		});

		const deleteDish = await this.dishesService.delete({ id });
		return deleteDish;
	}
}
