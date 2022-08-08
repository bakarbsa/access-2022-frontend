//server.js
const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const https = require('https');
const fs = require('fs');

const port = process.env.PORT || 80;
const app = express();

const options = {
  key: fs.readFileSync('/srv/www/keys/my-site-key.pem'),
  cert: fs.readFileSync('/srv/www/keys/chain.pem')
};

app.use((req, res) => {
  res.writeHead(200);
  res.end("hello world\n");
});

app.use(favicon(__dirname + '/build/favicon.ico'));

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/ping', function (req, res) {
  return res.send('pong');
});
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);
https.createServer(options, app).listen(8080);
