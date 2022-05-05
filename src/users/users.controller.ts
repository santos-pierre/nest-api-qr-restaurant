import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UsePipes,
	ValidationPipe,
	ParseUUIDPipe,
	HttpCode,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { CreateEmailVerifyTokenDto } from './dto/create-email-verify-token.dto';
import { EmailVerifyTokenPayolad } from './interface/EmailVerifyTokenPayload';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

	@Post()
	@UsePipes(new ValidationPipe({ transform: true }))
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@Get()
	findAll() {
		return this.usersService.findAll();
	}

	@Get(':id')
	findOne(@Param('id', ParseUUIDPipe) id: string) {
		return this.usersService.findOne(id);
	}

	@Patch(':id')
	update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(id, updateUserDto);
	}

	@Delete(':id')
	@HttpCode(204)
	remove(@Param('id', ParseUUIDPipe) id: string) {
		return this.usersService.remove(id);
	}

	@Post('/generate-token/email')
	async generateVerifyEmailToken(@Body() createVerifyEmailTokenDto: CreateEmailVerifyTokenDto) {
		const verifyEmailToken = await this.jwtService.signAsync({ ...createVerifyEmailTokenDto });
		return { verifyEmailToken };
	}

	// TODO ADD Redirect to Front-End
	@Get('/verify-email/:token')
	async verifyUser(@Param('token') token: string) {
		try {
			const { user_id, email } = await this.jwtService.verifyAsync<EmailVerifyTokenPayolad>(token);
			await this.usersService.verifyUser(user_id, email);
		} catch (error) {
			if (error instanceof JsonWebTokenError) {
				throw new HttpException(error, HttpStatus.BAD_REQUEST);
			} else if (error instanceof TokenExpiredError) {
				throw new HttpException(error, HttpStatus.BAD_REQUEST);
			} else if (error instanceof HttpException) {
				return;
			}
		}
	}
}
