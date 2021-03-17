import { Router, Request, Response } from 'express';
import {
	getHashtagsAndResults,
	storeHashtagsAndResults,
} from './controller/HashtagController';

const routes = Router();

routes.get('/hashtag', getHashtagsAndResults);
routes.post('/hashtag', storeHashtagsAndResults);

export default routes;
