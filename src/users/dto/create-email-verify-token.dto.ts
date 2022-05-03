import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateEmailVerifyTokenDto {
	@IsNotEmpty()
	@IsUUID()
	user_id: string;

	@IsNotEmpty()
	@Length(1, 255)
	@Transform(({ value }: TransformFnParams) => value.toLowerCase())
	@IsEmail()
	email: string;
}
