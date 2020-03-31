/* eslint-disable indent */
import crudOperation from './crud/crud';

export default  function httpRoute(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let data = [];
  switch (req.method) {
    case 'POST':
    case 'PUT':
    case 'DELETE':
      req.on('data', chunk => {
        data.push(chunk);
      });
      req.on('end', () => {
        if (data.length > 0) {
          const body = JSON.parse(data);
          req.body = body;
             crudOperation(req, res);
        }
      });
      break;
    case 'GET':
        crudOperation(req, res);
      break;
    default:
      crudOperation(req, res);
  }
}
