import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { AllergensService } from './allergens.service';

@Controller('allergens')
@UseInterceptors(TransformInterceptor)
export class AllergensController {
	constructor(private readonly restaurantsService: AllergensService) {}

	@Get()
	async findAll() {
		return await this.restaurantsService.findAll();
	}
}
