import { Hashtag } from '../entity/Hashtag';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Result } from '../entity/Result';
import axios from 'axios';
import { TwitterUser } from '../entity/TwitterUser';

const dotenv = require('dotenv').config();

interface formatedTwitterApiResponse {
	tweet_date: string;
	tweet: string;
	user: string;
	twitter: string;
	profile_img_url: string;
}

export const storeHashtagsAndResults = async (req: Request, res: Response) => {
	const hashtag = req.body.hashtag.toLowerCase();
	const { count } = req.body;

	if (!hashtag) {
		return res.status(400).send({ error: 'Missing hashtag' });
	}

	try {
		let newHashtag = await getRepository(Hashtag).findOne({
			hashtag: hashtag,
		});

		const twitterApiResponse = await axios.get(
			`https://api.twitter.com/1.1/search/tweets.json?q=%23${hashtag}&result_type=recent&count=${count}`,
			{
				headers: {
					Authorization: `Bearer ${process.env.API_KEY}`,
				},
			}
		);

		if (!twitterApiResponse.data.statuses.length) {
			return res.status(404).send({ error: 'No tweets found.' });
		}

		if (!newHashtag) {
			newHashtag = await getRepository(Hashtag).save({ hashtag: hashtag });
		}

		const formatedApiResponse: formatedTwitterApiResponse[] = twitterApiResponse.data.statuses.map(
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
		res.json({ hashtag: newHashtag, results: formatedApiResponse });

		await Promise.all(
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
	} catch (err) {
		console.log(err);
		return res.send(500);
	}
};

export const getHashtagsAndResults = async (req: Request, res: Response) => {
	const { q } = req.query;

	if (!q) {
		const allHashtags = await getRepository(Hashtag).find();
		const allResults = await getRepository(Result).find();
		return res.json({ allHashtags, allResults });
	}
	const hashtag = await getRepository(Hashtag).findOne({
		where: { hashtag: q.toString().toLowerCase() },
	});

	if (!hashtag) {
		return res.status(400).send({ error: 'Missing hashtag from database' });
	}

	const result = await getRepository(Result).find({
		where: { hashtag: hashtag.hashtagId },
	});
	return res.json({ hashtag, result });
};
