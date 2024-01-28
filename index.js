const http = require('http');
const url = require('url');
const members = require('./members.js');
const users = require('./users.js');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');
  const method = req.method.toUpperCase();
  const headers = req.headers;

  if (trimmedPath === '') {
    res.setHeader('Content-Type', 'text/plain');
    res.writeHead(200);
    res.end('This is the home page');
  } else if (trimmedPath === 'about') {
    const response = {
      Status: 'success',
      Message: 'response success',
      Description: 'Exercise #03',
      Date: new Date().toISOString(),
      Data: members,
    };
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify(response));
  } else if (trimmedPath === 'users') {
    users.getUsers((err, data) => {
      if (!err && data) {
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.end(JSON.stringify(data));
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(500);
        res.end(JSON.stringify({ Error: 'Could not get users' }));
      }
    });
  } else {
    res.setHeader('Content-Type', 'text/plain');
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

