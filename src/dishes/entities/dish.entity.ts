import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
	Unique,
	UpdateDateColumn,
} from 'typeorm';
import { Allergen } from './allergens.entity';
import { MenuCategory } from './menu-category.entity';

@Entity({ name: 'dishes' })
@Unique('UK_Dishe__Restaurant', ['slug', 'restaurant_id'])
export class Dish {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'varchar', nullable: false })
	slug: string;

	@Column({ type: 'varchar', nullable: false })
	name: string;

	@Column({ type: 'money', nullable: false })
	price: number;

	@Column({ type: 'varchar', nullable: true, length: '400' })
	description: string;

	@Column({ type: 'varchar', nullable: true })
	image_url: string;

	@Column({ type: 'boolean', nullable: false, default: false })
	published: boolean;

	@ManyToOne(() => Restaurant, (restaurant) => restaurant.id, { onDelete: 'CASCADE' })
	@Column({ type: 'varchar', nullable: false })
	@JoinColumn({ name: 'restaurant_id' })
	restaurant_id: string;

	@ManyToOne(() => MenuCategory, (menuCategory) => menuCategory.id)
	@Column({ type: 'varchar', nullable: false })
	@JoinColumn({ name: 'menu_category_id' })
	menu_category_id: string;

	@ManyToMany(() => Allergen, { cascade: true })
	@JoinTable({
		name: 'allergens_dishes',
		joinColumn: {
			name: 'dishe_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'allergen_id',
			referencedColumnName: 'id',
		},
	})
	allergens: Allergen[];

	@CreateDateColumn({ type: 'timestamptz', nullable: true })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamptz', nullable: true })
	updated_at: Date;

	@DeleteDateColumn({ type: 'timestamptz', nullable: true })
	deleted_at: Date;
}
