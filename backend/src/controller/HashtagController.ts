import { Hashtag } from '../entity/Hashtag';
import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { Result } from '../entity/Result';
import { Search } from '../entity/Search';
import axios from 'axios';

const dotenv = require('dotenv').config();

export const storeHashtagsAndResults = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let search;
	let hashtag;
	let myRes;

	hashtag = await getRepository(Hashtag).findOne({
		hashtag: req.body.hashtag,
	});

	const twitterRes = await axios.get(
		`https://api.twitter.com/1.1/search/tweets.json?q=%23${req.body.hashtag}&result_type=recent`,
		{
			headers: {
				Authorization: `Bearer ${process.env.API_KEY}`,
			},
		}
	);

	myRes = twitterRes.data.statuses.map((tweet) => {
		return {
			tweet_date: tweet.created_at,
			tweet: tweet.text,
			user: tweet.user.name,
			twitter: tweet.user.screen_name,
			profile_img_url: tweet.user.profile_image_url,
		};
	});

	if (hashtag) {
		search = await getRepository(Search).save({ hashtagId: hashtag.id });
	} else {
		hashtag = await getRepository(Hashtag).save({
			hashtag: req.body.hashtag,
		});
		search = await getRepository(Search).save({
			hashtagId: hashtag.id,
		});
	}

	const results = await Promise.all(
		myRes.map(async (result) => {
			console.log(search.id);
			return await getRepository(Result).save({
				user: result.user,
				content: result.tweet,
				tweet_date: result.tweet_date,
				twitter: result.twitter,
				profile_img_url: result.profile_img_url,
				searchId: search.id,
			});
		})
	);

	res.json({ hashtag, results });
};

export const getHashtagsAndResults = async (req: Request, res: Response) => {
	const hashtags = await getRepository(Hashtag).find();
	const results = await getRepository(Result).find();

	return res.json({ hashtags, results });
};
