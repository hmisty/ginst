/** the entry point of ginst webhook
 * Evan Liu 2015-11-30
 */
var express = require('express'),
    cookieParser = require('cookie-parser'),
    ejs = require('ejs'),
    http = require('http');

var app = express();

app.set('views', './views');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.use(express.static('assets'));
app.use(cookieParser());

app.get('/', function(req, res){
	res.send('ginst is here');
});

app.post('/install', function(req, res){
});

app.listen(8888);
