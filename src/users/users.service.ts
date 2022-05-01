import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as argon2 from 'argon2';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
	constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

	create = async (createUserDto: CreateUserDto): Promise<User> => {
		const hashedPassword = await argon2.hash(createUserDto.password, { type: argon2.argon2id });
		const newUser = await this.userRepository.save({ ...createUserDto, password: hashedPassword });
		return plainToInstance(User, newUser);
	};

	findAll = async (): Promise<[User[], number]> => {
		return this.userRepository.findAndCount();
	};

	findOne = async (id: string): Promise<User> => {
		return plainToInstance(User, await this.userRepository.findOneBy({ id }));
	};

	update = async (id: string, updateUserDto: UpdateUserDto): Promise<User> => {
		return plainToInstance(User, await this.userRepository.save({ id, ...updateUserDto }));
	};

	remove = async (id: string): Promise<DeleteResult> => {
		return await this.userRepository.delete({ id });
	};
}
