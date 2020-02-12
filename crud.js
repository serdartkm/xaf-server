const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'visa';
const client = new MongoClient(url);
module.exports.createData = function(req, res) {
  const { params } = req;
  console.log('req.body', req.body);
  client.connect((err, client) => {
    if (err) {
      console.log('err connecting--', err);
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(err));
      res.end();
    } else {
      const db = client.db('visa');
      db.collection(params['document']).insertOne(
        { ...req.body },
        (err, result) => {
          if (err) {
            console.log('err inserting--', err);
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify(err));
            res.end();
          } else {
            console.log('result--', result);
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify(result));
            res.end();
          }
          client.close();
        }
      );
    }
  });
};
module.exports.updateData = function(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('Update Calls\n');
};
module.exports.deleteData = function(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('Delete Calls\n');
};
module.exports.findData = function(req, res) {
  client.connect((err, client) => {
    if (err) {
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(err));
      res.end();
    } else {
      const db = client.db('visa');
      db.collection(params['document']).find({}, (err, result) => {
        if (err) {
          res.setHeader('Content-Type', 'application/json');
          res.write(JSON.stringify(err));
          res.end();
        } else {
          res.setHeader('Content-Type', 'application/json');
          res.write(JSON.stringify(result));
          res.end();
        }
        client.close();
      });
    }
  });
};
