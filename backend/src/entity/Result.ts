import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Search } from './Search';

@Entity()
export class Result {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	user: string;

	@Column()
	searchId: number;

	@Column()
	tweet_date: string;

	@Column()
	content: string;

	@Column()
	twitter: string;

	@Column()
	profile_img_url: string;

	@ManyToOne(() => Search, (search) => search.result)
	search: Search;

	@CreateDateColumn()
	created_at: Date;

	@CreateDateColumn()
	updated_at: Date;
}
