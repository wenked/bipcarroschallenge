import { Hashtag } from '../entity/Hashtag';
import { Request, Response, NextFunction } from 'express';
import { getRepository, getManager, createQueryBuilder } from 'typeorm';
import { Result } from '../entity/Result';
import axios from 'axios';
import { TwitterUser } from '../entity/TwitterUser';

const dotenv = require('dotenv').config();

export const storeHashtagsAndResults = async (req: Request, res: Response) => {
	const hashtag = req.body.hashtag.toLowerCase();

	if (!hashtag) {
		return res.status(400).send({ error: 'Missing hashtag' });
	}

	try {
		let newHashtag = await getRepository(Hashtag).findOne({
			hashtag: hashtag,
		});

		if (!newHashtag) {
			newHashtag = await getRepository(Hashtag).save({ hashtag: hashtag });
		}

		const twitterApiResponse = await axios.get(
			`https://api.twitter.com/1.1/search/tweets.json?q=%23${hashtag}&result_type=recent`,
			{
				headers: {
					Authorization: `Bearer ${process.env.API_KEY}`,
				},
			}
		);

		if (!twitterApiResponse.data.statuses.length) {
			console.log('koe');
			return res.status(404).send({ error: 'No tweets found.' });
		}

		const formatedApiResponse = twitterApiResponse.data.statuses.map(
			(tweet) => {
				return {
					tweet_date: tweet.created_at,
					tweet: tweet.text,
					user: tweet.user.name,
					twitter: tweet.user.screen_name,
					profile_img_url: tweet.user.profile_image_url,
				};
			}
		);

		const results = await Promise.all(
			formatedApiResponse.map(async (result) => {
				let user = await getRepository(TwitterUser).findOne({
					twitter: result.twitter,
				});
				if (!user) {
					user = await getRepository(TwitterUser).save({
						twitter: result.twitter,
						user: result.user,
						profile_img_url: result.profile_img_url,
					});
				}
				return await getRepository(Result).save({
					content: result.tweet,
					hashtag: newHashtag,
					tweet_date: result.tweet_date,
					twitterUser: user,
				});
			})
		);

		return res.json({ hashtag, results });
	} catch (err) {
		console.log(err);
		return res.send(500);
	}
};

export const getHashtagsAndResults = async (req: Request, res: Response) => {
	const hashtags = await getRepository(Hashtag).find();
	/* 
	const rawData = await getManager().query(`
	SELECT T.twitter,T.profile_img_url,R.content
	FROM twitter_user as T
	INNER JOIN result as R
	ON T.twitter = R."twitterUserTwitter"
	WHERE T.twitter = '_startupsdaily'
	`);

	const rawData2 = await getRepository(TwitterUser)
		.createQueryBuilder('twitter_user')
		.innerJoinAndSelect('twitter_user.results', 'result')
		.where('twitter_user.twitter = :twitter', { twitter: '_startupsdaily' })
		.getOne();
	console.log(rawData); */

	return res.json({ hashtags });
};
