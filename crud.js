const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'visa';
const client = new MongoClient(url);

function handlePromise({ promise, res }) {
  promise
    .then(result => {
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(result));
      res.end();
    })
    .catch(err => {
      const error = err;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(error));
      res.end();
    });
}

module.exports.insertOne = function(req, res) {
  debugger;
  const { params } = req;
  const doc = req.body;

  client.connect((err, client) => {
    if (err) {
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(err));
      res.end();
    } else {
      const db = client.db('visa');
      let promise = db.collection(params['document']).insertOne(doc);
      handlePromise({ promise, res });
    }
  });
};
module.exports.updateOne = function(req, res) {
  debugger;
  const { params } = req;
  const { doc, filter } = req.body;
  delete doc._id;
  client.connect((err, client) => {
    if (err) {
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(err));
      res.end();
    } else {
      const db = client.db('visa');
      db.collection(params['document']).updateOne(
        filter,
        { $set: { doc } },
        (err, result) => {
          if (err) {
            const error = err;
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify(error));
            res.end();
          } else {
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify(result));
            res.end();
          }
        }
      );
    }
  });
};
module.exports.deleteOne = function(req, res) {
  debugger;
  const { params } = req;
  const { doc, filter } = req.body;
  delete doc._id;
  client.connect((err, client) => {
    if (err) {
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(err));
      res.end();
    } else {
      const db = client.db('visa');
      db.collection(params['document']).deleteOne(filter, (err, result) => {
        if (err) {
          const error = err;
          res.setHeader('Content-Type', 'application/json');
          res.write(JSON.stringify(error));
          res.end();
        } else {
          res.setHeader('Content-Type', 'application/json');
          res.write(JSON.stringify(result));
          res.end();
        }
      });
    }
  });
};
module.exports.find = function(req, res) {
  const { params } = req;
  client.connect((err, client) => {
    if (err) {
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(err));
      res.end();
    } else {
      const db = client.db('visa');
      let promise = db
        .collection(params['document'])
        .find({})
        .toArray();
      handlePromise({ promise, res });
    }
  });
};
