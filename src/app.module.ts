import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { cwd } from 'process';
import { MailerService } from './mailer/mailer.service';
import { RestaurantsModule } from './restaurants/restaurants.module';
import * as path from 'path';
import { Restaurant } from './restaurants/entities/restaurant.entity';
import { MenuCategory } from './menu-categories/entities/menu-category.entity';
import { Allergens } from './allergenes/entities/allergens.entity';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.DATABASE_HOST,
			port: parseInt(process.env.DATABASE_PORT),
			username: process.env.DATABASE_USERNAME,
			password: process.env.DATABASE_PASSWORD,
			database: process.env.DATABASE_NAME,
			synchronize: true,
			entities: [User, Restaurant, MenuCategory, Allergens],
		}),
		MailerModule.forRoot({
			transport: {
				host: process.env.MAILER_HOST,
				port: parseInt(process.env.MAILER_PORT),
			},
			defaults: {
				from: process.env.MAILER_FROM,
			},
			template: {
				dir: cwd() + '/templates',
				adapter: new HandlebarsAdapter(),
				options: {
					strict: true,
				},
			},
			options: {
				partials: {
					dir: path.join(cwd(), 'templates/partials'),
					options: {
						strict: true,
					},
				},
			},
		}),
		UsersModule,
		AuthModule,
		RestaurantsModule,
	],
	controllers: [AppController],
	providers: [AppService, MailerService],
})
export class AppModule {}
