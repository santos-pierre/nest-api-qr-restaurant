import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuCategory } from 'src/dishes/entities/menu-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MenuCategoriesService {
	constructor(
		@InjectRepository(MenuCategory) private readonly menuCategoriesRepository: Repository<MenuCategory>,
	) {}

	async findAll() {
		return await this.menuCategoriesRepository.findAndCount({ select: ['id', 'slug', 'name'] });
	}
}
