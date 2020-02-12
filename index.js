const Router = require('./router');
const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin','*')
  let data = [];
  req.on('data', chunk => {
    data.push(chunk);
  });
  req.on('end', () => {
    const body = JSON.parse(data); // 'Buy the milk'
    req.body = body;
    console.log('req.body', req.body);
    Router(req, res);
  });
});
server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(8000);
