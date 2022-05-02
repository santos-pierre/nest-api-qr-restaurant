import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@Get('/setcookie')
	setCookie(@Res() res: Response) {
		res.cookie('my token', 'encrypted value');
		res.send('Cookie have set succesfully');
	}
}
