/* eslint-disable linebreak-style */
/* eslint-disable indent */
import crudOperation from './crud/crud';
import authOperation from './auth/index';
import seedOperation from './seed';
const url = 'mongodb://localhost:27017';
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

export default async function httpRoute(req, res) {
  req.auth = null;
  const clnt = await client.connect();
  req.client = clnt;
  res.setHeader('Access-Control-Allow-Origin', '*');
  let data = [];
  const { url } = req;
  let responseHeader = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'access-control-allow-headers': '*',
    'access-control-max-age': 10,
    'Content-Type': 'application/json',
  };
  switch (req.method) {
    case 'OPTIONS':
      res.writeHead(200, responseHeader);
      res.end();
    case 'POST':
    case 'PUT':
    case 'DELETE':
      req.on('data', (chunk) => {
        data.push(chunk);
      });
      req.on('end', () => {
        if (data.length > 0) {
          const body = JSON.parse(data);
          req.body = body;
          switch (true) {
            case url.includes('/auth'):
              debugger;
              authOperation(req, res);
              break;
            case url.includes('/crud'):
              debugger;
              crudOperation(req, res);
              break;
            case url.includes('/seed'):
              debugger;
              seedOperation(req, res);
              break;
            default:
              break;
          }
        }
      });
      break;
    case 'GET':
      switch (true) {
        case url.includes('/auth'):
          debugger;
          authOperation(req, res);
          break;
        case url.includes('/crud'):
          debugger;
          crudOperation(req, res);
          break;
        default:
          break;
      }

      break;
    default:
      crudOperation(req, res);
  }
}
