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
  req.params = getParams(req);
  const { url } = req;
  switch (true) {
    case req.url.includes('/create'):
      crud.createData(req, res);
      break;
    case req.url.includes('/update'):
      crud.updateData(req, res);
      break;
    case req.url.includes('/delete'):
      crud.deleteData(req, res);
      break;
    case req.url.includes('/find'):
      crud.findData(req, res);
      break;
    default:
      res.setHeader('Content-Type', 'text/plain');
      res.end('Path no spesified\n');
  }
};
