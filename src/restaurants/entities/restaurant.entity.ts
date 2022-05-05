import { User } from 'src/users/entities/user.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	Unique,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'restaurants' })
@Unique('UK_Restaurant__User', ['slug', 'user_id'])
export class Restaurant {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'varchar', nullable: true })
	slug: string;

	@Column({ type: 'varchar', nullable: false })
	name: string;

	@Column({ type: 'varchar', nullable: false })
	street_name: string;

	@Column({ type: 'integer', nullable: false })
	street_number: number;

	@Column({ type: 'varchar', nullable: false })
	city_name: string;

	@Column({ type: 'integer', nullable: false })
	city_code: number;

	@ManyToOne(() => User, (user) => user.id)
	@JoinColumn({ name: 'user_id' })
	user_id: User;

	@CreateDateColumn({ type: 'timestamptz', nullable: true })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamptz', nullable: true })
	updated_at: Date;
}
