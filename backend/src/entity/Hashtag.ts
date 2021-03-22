import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Result } from './Result';

@Entity()
export class Hashtag {
	@PrimaryGeneratedColumn()
	hashtagId: number;

	@Column({ unique: true })
	hashtag: string;

	@CreateDateColumn()
	created_at: Date;

	@OneToMany(() => Result, (result) => result.hashtag, { eager: true })
	results: Result[];
}
