import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import 'reflect-metadata';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api/v1');
	app.enableCors({ credentials: true, origin: 'http://localhost:3001' });
	app.use(cookieParser());
	await app.listen(3000);
}
bootstrap();
