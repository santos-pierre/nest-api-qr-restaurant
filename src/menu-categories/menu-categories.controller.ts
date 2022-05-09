import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { MenuCategoriesService } from './menu-categories.service';

@Controller('menu-categories')
@UseInterceptors(TransformInterceptor)
export class MenuCategoriesController {
	constructor(private readonly menuCategoriesService: MenuCategoriesService) {}

	@Get()
	async findAll() {
		return await this.menuCategoriesService.findAll();
	}
}
