import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule.forRoot(),
		UsersModule,
		PassportModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: {
				expiresIn: '30d',
			},
		}),
	],
	providers: [AuthService, LocalStrategy, JwtStrategy],
	controllers: [AuthController],
})
export class AuthModule {}
