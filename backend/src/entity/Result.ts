import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Hashtag } from './Hashtag';
import { TwitterUser } from './TwitterUser';

@Entity()
export class Result {
	@PrimaryGeneratedColumn()
	resultId: number;

	@CreateDateColumn()
	created_at: Date;

	@Column()
	tweet_date: Date;

	@Column()
	content: string;

	@ManyToOne(() => Hashtag, (hashtag) => hashtag.results)
	hashtag: Hashtag;

	@ManyToOne(() => TwitterUser, (twitterUser) => twitterUser.results)
	twitterUser: TwitterUser;
}
