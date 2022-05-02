import { Injectable } from '@nestjs/common';
import LoginUserDto from 'src/users/dto/login-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService, private jwtService: JwtService) {}

	async login(user: User) {
		const payload = {
			sub: user.id,
			email: user.email,
			role: user.role,
			is_verfied: !!user.email_verified_at,
		};

		return {
			access_token: this.jwtService.sign(payload),
		};
	}

	async validate(loginDto: LoginUserDto) {
		return await this.usersService.validateUser(loginDto);
	}
}
