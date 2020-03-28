import express, {Request, Response} from 'express';
import {router} from './routes/loginRoutes';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

const app = express();

app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use(cookieSession({keys: ['laskdfj']}))
app.use(router);

app.get('/', (request: Request, response: Response) => {
	response.send(`
		<div>
			<h1>Hi There!</h1>
		</div>
	`);
});

app.listen(3001, () => console.log('Listening on port 3001.'));
