import {Router, Request, Response} from 'express';

interface RequestWithBody extends Request {
	body: {[key: string]: string | undefined};
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
		request.session = {logginIn: true};
		response.redirect('/');
	} else {
		response.send('Invalid email or password.');
	}
});

router.get('/', (request: Request, response: Response) => {
	if (request.session && request.session.logginIn) {
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
export {router};
