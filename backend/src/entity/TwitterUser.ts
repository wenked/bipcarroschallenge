import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryColumn,
} from 'typeorm';
import { Result } from './Result';

@Entity()
export class TwitterUser {
	@PrimaryColumn()
	twitter: string;

	@Column()
	user: string;

	@Column()
	profile_img_url: string;

	@CreateDateColumn()
	created_at: Date;

	@OneToMany(() => Result, (result) => result.twitterUser)
	results: Result[];
}
