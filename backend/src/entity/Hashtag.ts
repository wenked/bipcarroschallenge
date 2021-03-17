import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Search } from './Search';

@Entity()
export class Hashtag {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	hashtag: string;

	@OneToMany(() => Search, (search) => search.hashtag)
	search: Search[];

	@CreateDateColumn()
	created_at: Date;

	@CreateDateColumn()
	updated_at: Date;
}
