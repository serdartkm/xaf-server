const crudOperation = require('./crud');

module.exports =  function httpRoute(req, res) {
    let data = [];
    req.on('data', chunk => {
        data.push(chunk);
      });
      req.on('end', () => {
        if (data.length > 0) {
          const body = JSON.parse(data); // 'Buy the milk'
          req.body = body;
          crudOperation(req, res);
        }
      });
}