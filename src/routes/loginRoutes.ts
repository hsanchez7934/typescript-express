import {Router, Request, Response} from 'express';
import {NextFunction} from 'express-serve-static-core';

interface RequestWithBody extends Request {
	body: {[key: string]: string | undefined};
}

function requireAuth(
	request: Request,
	response: Response,
	next: NextFunction
): void {
	console.log(request.session);
	if (request.session && request.session.loggedIn) {
		next();
		return;
	}
	response.status(403);
	response.send('Not permitted.');
}

const router = Router();

router.get('/login', (request: Request, response: Response) => {
	response.send(`
		<form method="POST">
			<div>
				<label>Email</label>
				<input name="email" />
			</div>
			<div>
				<label>Password</label>
				<input name="password" type="password" />
			</div>
			<button>Submit</button>
		</form>	
	`);
});

router.post('/login', (request: RequestWithBody, response: Response) => {
	const {email, password} = request.body;
	if (
		email &&
		password &&
		(email === 'email@test.com' && password === 'password')
	) {
		request.session = {loggedIn: true};
		response.redirect('/');
	} else {
		response.send('Invalid email or password.');
	}
});

router.get('/', (request: Request, response: Response) => {
	if (request.session && request.session.loggedIn) {
		response.send(`
			<div>
				<div>You are logged in.</div>
				<a href="/logout">Logout</a>
			</div>
		`);
	} else {
		response.send(`
			<div>
				<div>You are not logged in.</div>
				<a href="/login">Login</a>
			</div>
		`);
	}
});

router.get('/logout', (request: Request, response: Response) => {
	request.session = undefined;
	response.redirect('/');
});

router.get(
	'/protected',
	requireAuth,
	(request: Request, response: Response) => {
		response.send('Welcome to protected route, loggin in User.');
	}
);

export {router};
