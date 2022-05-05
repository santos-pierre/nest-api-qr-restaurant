import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'restaurants' })
export class Restaurant {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'varchar', unique: true, nullable: true })
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
	user_id: User;
}
