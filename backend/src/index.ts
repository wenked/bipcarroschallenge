import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import routes from './routes';
const cors = require('cors');

const dotenv = require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(routes);

(async () => {
	try {
		await createConnection();
		app.listen(process.env.PORT, () => {
			console.log(`Server is up and listening on port ${process.env.PORT}.`);
		});
	} catch (err) {
		console.log(err);
	}
})();
