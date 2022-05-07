import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateDishDto {
	@IsNotEmpty()
	@IsString()
	@Length(2, 255)
	@Transform(({ value }: TransformFnParams) => value.trim())
	name: string;

	@IsNotEmpty()
	@IsNumber()
	price: number;

	@Transform(({ value }: TransformFnParams) => value.trim())
	description: string;

	@IsNotEmpty()
	@IsString()
	menu_category_id: string;

	@IsString({ each: true })
	allergens: string[] = [];
}
