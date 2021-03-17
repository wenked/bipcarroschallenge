import { Router, Request, Response } from 'express';
import {
	getHashtagsAndResults,
	storeHashtagsAndResults,
} from './controller/HashtagController';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
	return response.json({ message: 'Hello World xd' });
});

routes.get('/hashtag', getHashtagsAndResults);
routes.post('/hashtag', storeHashtagsAndResults);

export default routes;
