import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Allergen } from 'src/dishes/entities/allergens.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AllergensService {
	constructor(@InjectRepository(Allergen) private readonly allergensRepository: Repository<Allergen>) {}

	async findAll() {
		return await this.allergensRepository.findAndCount({ select: ['id', 'slug', 'name'] });
	}
}
