import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum UserRole {
	ADMIN = 'ADMIN',
	RESTAURANT_OWNER = 'RESTAURANT_OWNER',
}

@Entity({ name: 'users' })
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'varchar', length: 255, nullable: false })
	name: string;

	@Column({ type: 'varchar', length: 255, nullable: false, unique: true })
	email: string;

	@Column({ type: 'varchar', length: 96, nullable: false })
	@Exclude()
	password: string;

	@Column({ type: 'time with time zone', nullable: true })
	email_verified_at: Date;

	@Column({ type: 'enum', enum: UserRole, default: UserRole.RESTAURANT_OWNER })
	role: UserRole;

	@CreateDateColumn({ type: 'time with time zone', nullable: true })
	created_at: Date;

	@UpdateDateColumn({ type: 'time with time zone', nullable: true })
	updated_at: Date;
}
