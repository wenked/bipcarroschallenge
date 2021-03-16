import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Hashtags {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	hashtag: string;

	@CreateDateColumn()
	created_at: Date;

	@CreateDateColumn()
	updated_at: Date;
}
