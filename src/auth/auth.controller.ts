import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { TOKEN_KEY } from './cookie.extractor';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UseGuards(AuthGuard('local'))
	@Post('login')
	async login(@Req() req) {
		return await this.authService.login(req.user);
	}

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	async profile(@Req() req: Request) {
		return req.user;
	}
}
