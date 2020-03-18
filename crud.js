const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017';

const client = new MongoClient(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
const getParams = require('./getParams');
function handleResponse({ result, res, statusCode }) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = statusCode;
  res.write(JSON.stringify(result));
  res.end();
}

module.exports = async function crudOperation(req, res, dbName) {
  let result = null;
  const params = getParams(req);
  let doc = req.body;
  const { url } = req;
  let filter = null;

  try {
    const clnt = await client.connect();
    const db = clnt.db(dbName);
    let obj;
    let updateResult;
    let deleteResult;
    switch (true) {
      case url.includes('/insertOne'):
        result = await db.collection(params['document']).insertOne(doc);

        handleResponse({
          result: { _id: result.insertedId },
          statusCode: 201,
          res
        });

        break;
      case url.includes('/updateOne'):
        obj = { ...doc };
        delete obj._id;
        filter = { _id: new ObjectID(doc._id) };
        updateResult = await db
          .collection(params['document'])
          .updateOne(filter, { $set: { ...obj } });

        if (updateResult.result.nModified === 1) {
          handleResponse({ result: {}, statusCode: 204, res });
        } else {
          handleResponse({ result, statusCode: 304, res });
        }

        break;
      case url.includes('/deleteOne'):
        filter = { _id: new ObjectID(doc._id) };
        deleteResult = await db
          .collection(params['document'])
          .deleteOne(filter);

        if (deleteResult.deletedCount === 1) {
          handleResponse({ result: {}, statusCode: 202, res });
        } else {
          handleResponse({ result: {}, statusCode: 404, res });
        }

        break;
      case url.includes('/find'):
        result = await db
          .collection(params['document'])
          .find({})
          .toArray();

        handleResponse({ result, statusCode: 200, res });

        break;
      default:
        res.setHeader('Content-Type', 'text/plain');
        res.end('Path no spesified\n');
    }
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(error));
    res.end();
  }
};
