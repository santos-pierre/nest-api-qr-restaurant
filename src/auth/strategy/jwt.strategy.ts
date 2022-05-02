import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { fromCookie } from '../cookie.extractor';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private userService: UsersService) {
		super({
			jwtFromRequest: fromCookie(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET,
		});
	}

	async validate(payload: any) {
		const user = await this.userService.findOne(payload.sub);

		if (!user) {
			throw new HttpException('', HttpStatus.UNAUTHORIZED);
		}

		return user;
	}
}
