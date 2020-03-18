
const http = require('http');
const httpRoute = require('./http-route');
const server = http.createServer(httpRoute('visadb'));
server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(8000, () => {
  console.log('processId', process.pid);
});
