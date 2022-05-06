import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'allergens' })
export class Allergens {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'varchar', nullable: true })
	@Unique('UK_Allergen__Slug', ['slug'])
	slug: string;

	@Column({ type: 'varchar', nullable: false })
	name: string;

	@CreateDateColumn({ type: 'timestamptz', nullable: true })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamptz', nullable: true })
	updated_at: Date;
}
