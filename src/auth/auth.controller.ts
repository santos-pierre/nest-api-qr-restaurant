import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import ms from 'ms';
import { AuthService } from './auth.service';
import { TOKEN_KEY } from './cookie.extractor';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	// @UseGuards(AuthGuard('local'))
	@HttpCode(200)
	@Post('login')
	async login(
		@Body('email') email: string,
		@Body('password') password: string,
		@Res({ passthrough: true }) res: Response,
	) {
		const user = await this.authService.validate({ email, password });
		const { access_token } = await this.authService.login(user);
		res.cookie(TOKEN_KEY, access_token, { maxAge: ms('30d') });
	}

	@UseGuards(JwtAuthGuard)
	@Get('user')
	async currenUser(@Req() req: Request) {
		return req.user;
	}

	@Get('logout')
	@HttpCode(204)
	async logout(@Res({ passthrough: true }) res: Response) {
		res.clearCookie(TOKEN_KEY);
	}
}
