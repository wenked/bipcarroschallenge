import { Hashtag } from '../entity/Hashtag';
import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { Result } from '../entity/Result';
import { Search } from '../entity/Search';

export const storeHashtagsAndResults = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let search;

	const hashtag = await getRepository(Hashtag).findOne({
		hashtag: req.body.hashtag,
	});

	if (hashtag) {
		search = await getRepository(Search).save({ hashtagId: hashtag.id });
	} else {
		const newHashtag = await getRepository(Hashtag).save(req.body.hashtag);
		search = await getRepository(Search).save({
			hashtagId: newHashtag.id,
		});
	}

	try {
		const results = await Promise.all(
			req.body.results.forEach(async (result) => {
				console.log(result);
				await getRepository(Result).save({
					content: result.text,
					searchId: search.id,
				});
			})
		);
		console.log(results, 'aq');

		res.json({ hashtag, results });
	} catch (err) {
		next(err);
	}
};

export const getHashtagsAndResults = async (req: Request, res: Response) => {
	const hashtags = await getRepository(Hashtag).find();
	const results = await getRepository(Result).find();

	return res.json({ hashtags, results });
};
