import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	handleRequest(_err: any, user: any, info: any) {
		if (!user || info?.constructor?.name === 'TokenExpiredError') {
			throw new HttpException('Token Expired', HttpStatus.UNAUTHORIZED);
		}

		return user;
	}
}
