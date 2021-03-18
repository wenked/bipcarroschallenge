import { Hashtag } from '../entity/Hashtag';
import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { Result } from '../entity/Result';

import axios from 'axios';
import { TwitterUser } from '../entity/TwitterUser';

const dotenv = require('dotenv').config();

export const storeHashtagsAndResults = async (req: Request, res: Response) => {
	const searchedHashtag = req.body;

	let hashtag = await getRepository(Hashtag).findOne({
		hashtag: searchedHashtag.hashtag,
	});

	if (!hashtag) {
		hashtag = await getRepository(Hashtag).save(searchedHashtag);
	}

	const twitterApiResponse = await axios.get(
		`https://api.twitter.com/1.1/search/tweets.json?q=%23${searchedHashtag.hashtag}&result_type=recent`,
		{
			headers: {
				Authorization: `Bearer ${process.env.API_KEY}`,
			},
		}
	);

	const formatedApiResponse = twitterApiResponse.data.statuses.map((tweet) => {
		return {
			tweet_date: tweet.created_at,
			tweet: tweet.text,
			user: tweet.user.name,
			twitter: tweet.user.screen_name,
			profile_img_url: tweet.user.profile_image_url,
		};
	});

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
				hashtag: hashtag,
				tweet_date: result.tweet_date,
				twitterUser: user,
			});
		})
	);
	res.json({ hashtag, results: formatedApiResponse });
};

export const getHashtagsAndResults = async (req: Request, res: Response) => {
	const hashtags = await getRepository(Hashtag).find();

	return res.json({ hashtags });
};
