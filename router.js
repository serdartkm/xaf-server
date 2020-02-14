const crud = require('./crud');

const getParams = function(req) {
  let q = req.url.split('?'),
    result = {};
  if (q.length >= 2) {
    q[1].split('&').forEach(item => {
      try {
        result[item.split('=')[0]] = item.split('=')[1];
      } catch (e) {
        result[item.split('=')[0]] = '';
      }
    });
  }

  return result;
};

module.exports = function Router(req, res) {
  debugger;
  req.params = getParams(req);
  const { url } = req;
  debugger;
  switch (true) {
    case req.url.includes('/insertOne'):
      debugger;
      crud.insertOne(req, res);
      break;
    case req.url.includes('/updateOne'):
      debugger;
      crud.updateOne(req, res);
      break;
    case req.url.includes('/delete'):
      crud.deleteOne(req, res);
      break;
    case req.url.includes('/find'):
      crud.find(req, res);
      break;
    default:
      res.setHeader('Content-Type', 'text/plain');
      res.end('Path no spesified\n');
  }
};
