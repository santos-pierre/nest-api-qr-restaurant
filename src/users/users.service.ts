import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as argon2 from 'argon2';
import { plainToInstance } from 'class-transformer';
import LoginUserDto from './dto/login-user.dto';

@Injectable()
export class UsersService {
	constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

	async create(createUserDto: CreateUserDto): Promise<User> {
		const hashedPassword = await argon2.hash(createUserDto.password, { type: argon2.argon2id });
		const newUser = await this.userRepository.save({ ...createUserDto, password: hashedPassword });
		return plainToInstance(User, newUser);
	}

	async findAll(): Promise<[User[], number]> {
		return await this.userRepository.findAndCount();
	}

	async findOne(id: string): Promise<User> {
		return plainToInstance(User, await this.userRepository.findOneBy({ id }));
	}

	async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
		return plainToInstance(User, await this.userRepository.save({ id, ...updateUserDto }));
	}

	async remove(id: string): Promise<DeleteResult> {
		return await this.userRepository.delete({ id });
	}

	private async findByEmailAndId(id: string, email: string): Promise<User> {
		return plainToInstance(
			User,
			await this.userRepository
				.createQueryBuilder('user')
				.where('user.id = :id', { id })
				.andWhere('user.email = :email', { email })
				.getOne(),
		);
	}

	async verifyUser(id: string, email: string): Promise<User> {
		const user = await this.findByEmailAndId(id, email);
		return await this.userRepository.save({ ...user, email_verified_at: new Date() });
	}

	async validateUser(loginDto: LoginUserDto): Promise<User> {
		const user = await this.userRepository.findOneBy({ email: loginDto.email });

		if (user && (await argon2.verify(user.password, loginDto.password, { type: argon2.argon2id }))) {
			return plainToInstance(User, user);
		}

		throw new HttpException('Credentials do not match our records', HttpStatus.UNPROCESSABLE_ENTITY);
	}
}
