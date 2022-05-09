import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class DishRestaurantParam {
	@IsNotEmpty()
	@IsString()
	@Transform(({ value }: TransformFnParams) => value.trim())
	restaurant_id: string;
}
