"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
exports.router = router;
router.get('/login', function (request, response) {
    response.send("\n\t\t<form method=\"POST\">\n\t\t\t<div>\n\t\t\t\t<label>Email</label>\n\t\t\t\t<input name=\"email\" />\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<label>Password</label>\n\t\t\t\t<input name=\"password\" type=\"password\" />\n\t\t\t</div>\n\t\t\t<button>Submit</button>\n\t\t</form>\t\n\t");
});
router.post('/login', function (request, response) {
    var _a = request.body, email = _a.email, password = _a.password;
    if (email &&
        password &&
        (email === 'email@test.com' && password === 'password')) {
        request.session = { logginIn: true };
        response.redirect('/');
    }
    else {
        response.send('Invalid email or password.');
    }
});
router.get('/', function (request, response) {
    if (request.session && request.session.logginIn) {
        response.send("\n\t\t\t<div>\n\t\t\t\t<div>You are logged in.</div>\n\t\t\t\t<a href=\"/logout\">Logout</a>\n\t\t\t</div>\n\t\t");
    }
    else {
        response.send("\n\t\t\t<div>\n\t\t\t\t<div>You are not logged in.</div>\n\t\t\t\t<a href=\"/login\">Login</a>\n\t\t\t</div>\n\t\t");
    }
});
