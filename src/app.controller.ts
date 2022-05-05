import { Controller, Get, HttpCode, HttpException, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { MailerService } from './mailer/mailer.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService, private readonly mailerService: MailerService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	//TODO Clean Test Routes
	@Get('/setcookie')
	setCookie(@Res() res: Response) {
		res.cookie('my token', 'encrypted value');
		res.send('Cookie have set succesfully');
	}

	@Post('/test-send')
	@HttpCode(200)
	async testSend() {
		const isSent = await this.mailerService.sendEmailVerification({
			to: 'santospierre@gmail.com',
			context: {
				name: 'Pierre',
				email: 'santospierre@gmail.com',
				url: process.env.APP_URL + '/verify/token',
			},
		});

		if (!isSent) {
			return new HttpException('Error sending message! try again later', 500);
		}

		return { message: 'Email Sent', status: 200 };
	}
}
