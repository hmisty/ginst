/** the entry point of ginst webhook
 * Evan Liu 2015-11-30
 */
var express = require('express'),
    cookieParser = require('cookie-parser'),
    webhookHandler = require('github-webhook-handler'),
    ejs = require('ejs'),
    http = require('http');

var topology = require('./topology.js');

/********* constants ************/
var GITHUB_WEBHOOK_PATH = '/install';
var GITHUB_WEBHOOK_SECRET = '123456';

/*********** tool **************/
function run_cmd(cmd, args, callback) {
  var exec = require('child_process').spawn(cmd, args);
  exec.stdout.on('data', function(data) { callback(data.toString()) });
  exec.stderr.on('data', function(data) { callback(data.toString()) });
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

    var thishost = require('os').hostname();
    var deploycmd = './example/deploy-dev.sh'; //to deploy dev by default
    if (topology.staging.indexOf(thishost) != -1) {
      deploycmd = './example/deploy-staging.sh';
    }
    if (topology.production.indexOf(thishost) != -1) {
      deploycmd = './example/deploy-production.sh';
    }
    //if all contain thishost, to deploy production

    run_cmd('sh', [deploycmd], function(text){ console.log(text) });
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
