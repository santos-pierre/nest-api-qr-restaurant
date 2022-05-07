import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { RestaurantsService } from 'src/restaurants/restaurants.service';
import { RequestWithUser } from 'src/users/interface/RequestWithUser';

@Injectable()
export class OwnerDishGuard implements CanActivate {
	constructor(private readonly restaurantsService: RestaurantsService) {}
	async canActivate(context: ExecutionContext) {
		const {
			params: { restaurant_id },
			user,
		} = context.switchToHttp().getRequest<RequestWithUser>();

		const restaurant = await this.restaurantsService.findOneByUser(restaurant_id, user.id);

		if (!restaurant) {
			throw new NotFoundException();
		}

		return restaurant.user_id.id === user.id;
	}
}
