/** the entry point of ginst webhook
 * Evan Liu 2015-11-30
 */
var express = require('express'),
    cookieParser = require('cookie-parser'),
    webhookHandler = require('github-webhook-handler'),
    ejs = require('ejs'),
    http = require('http');

/********* constants ************/
var GITHUB_WEBHOOK_PATH = '/install';
var GITHUB_WEBHOOK_SECRET = '123456';

/*********** tool **************/
function run_cmd(cmd, args, callback) {
  var exec = require('child_process').spawn(cmd, args);
  var res = "";

  exec.stdout.on('data', function(data) { res += data; });
  exec.stderr.on('data', function(data) { res += data; });
  exec.on('exit', function(code) { callback ('exec ' + cmd + '\n' + resp + '\ndone(' + code + ')') });
}

/********* webhook ************/
var handler = webhookHandler({ path: GITHUB_WEBHOOK_PATH, secret: GITHUB_WEBHOOK_SECRET });

handler.on('error', function (err) {
    console.error('Error:', err.message)
});
 
handler.on('push', function (event) {
    console.log('Received a push event for %s to %s',
          event.payload.repository.name,
              event.payload.ref);
      run_cmd('sh', ['./example/deploy-dev.sh'], function(text){ console.log(text) });
});

/******* web service **********/
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
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  });
});

app.listen(8888);
