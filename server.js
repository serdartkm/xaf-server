const Router = require('./router');
const http = require('http');
const crudOperation = require('./crud');
module.exports = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let data = [];

  req.on('data', chunk => {
    data.push(chunk);
  });
  req.on('end', () => {
    if (data.length > 0) {
      const body = JSON.parse(data); // 'Buy the milk'
      req.body = body;
    }
    crudOperation(req, res);
  });
});
server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
