import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { RestaurantsService } from 'src/restaurants/restaurants.service';
import { RequestWithUser } from 'src/users/interface/RequestWithUser';

@Injectable()
export class OwnerResourceGuard implements CanActivate {
	constructor(private readonly restaurantsService: RestaurantsService) {}
	async canActivate(context: ExecutionContext) {
		const {
			params: { slug },
			user,
		} = context.switchToHttp().getRequest<RequestWithUser>();

		const restaurant = await this.restaurantsService.findOneByUser(slug, user.id);

		if (!restaurant) {
			throw new NotFoundException();
		}

		return restaurant.user_id.id === user.id;
	}
}
