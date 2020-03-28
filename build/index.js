"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.get('/', function (request, response) {
    response.send("\n\t\t<div>\n\t\t\t<h1>Hi There!</h1>\n\t\t</div>\n\t");
});
app.listen(3000, function () { return console.log('Listening on port 3000.'); });
