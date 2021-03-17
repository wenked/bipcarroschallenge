import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Hashtag } from './Hashtag';
import { Result } from './Result';

@Entity()
export class Search {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	hashtagId: number;

	@OneToMany(() => Result, (result) => result.search)
	result: Result[];

	@ManyToOne(() => Hashtag, (hashtag) => hashtag.search)
	hashtag: Hashtag;

	@CreateDateColumn()
	created_at: Date;

	@CreateDateColumn()
	updated_at: Date;
}
