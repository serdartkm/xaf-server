const crudOperation = require('./crud');

module.exports = function(dbName) {
  return function httpRoute(req, res) {
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
            const body = JSON.parse(data); // 'Buy the milk'
            req.body = body;
            crudOperation(req, res, dbName);
          }
        });
        break;
      case 'GET':
        crudOperation(req, res, dbName);
        break;
      default:
        crudOperation(req, res, dbName);
    }
  };
};
