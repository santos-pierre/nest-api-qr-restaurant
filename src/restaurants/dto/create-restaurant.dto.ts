import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateRestaurantDto {
	@IsNotEmpty()
	@IsString()
	@Length(2, 255)
	@Transform(({ value }: TransformFnParams) => value.trim())
	name: string;

	@IsNotEmpty()
	@IsString()
	@Length(2, 255)
	@Transform(({ value }: TransformFnParams) => value.trim())
	street_name: string;

	@IsNotEmpty()
	@IsNumber()
	street_number: number;

	@IsNotEmpty()
	@IsString()
	@Transform(({ value }: TransformFnParams) => value.trim())
	city_name: string;

	@IsNotEmpty()
	@IsNumber()
	city_code: number;
}
