import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'menu_categories' })
export class MenuCategory {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'varchar', nullable: true })
	@Unique('UK_Menu__Category', ['slug'])
	slug: string;

	@Column({ type: 'varchar', nullable: false })
	name: string;

	@CreateDateColumn({ type: 'timestamptz', nullable: true })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamptz', nullable: true })
	updated_at: Date;
}
