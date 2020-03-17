const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017';
const dbName = 'visa';
const client = new MongoClient(url, { useUnifiedTopology: true });
const getParams = require('./getParams');
function handleResponse({ result, res, statusCode }) {
  debugger;
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = statusCode;
  res.write(JSON.stringify(result));
  res.end();
}

module.exports = async function crudOperation(req, res) {
  debugger;
  let result = null;
  const params = getParams(req);
  let doc = req.body;
  //let _id = doc._id;
  const { url } = req;
  let filter = null;

  try {
    const clnt = await client.connect();
    const db = clnt.db('visa');
    switch (true) {
      case url.includes('/insertOne'):
        debugger;
        result = await db.collection(params['document']).insertOne(doc);
        debugger;

        await handleResponse({
          result: { _id: result.insertedId },
          statusCode: 201,
          res
        });
      
        break;
      case url.includes('/updateOne'):
        filter = { _id: new ObjectID(_id) };
        delete doc._id;
        debugger;
        result = await db
          .collection(params['document'])
          .updateOne(filter, { $set: { doc } });
        await handleResponse({ result: { ...result, _id }, res });
        debugger;
        break;
      case url.includes('/deleteOne'):
        debugger;
        filter = { _id: new ObjectID(_id) };
        debugger;
        result = await db.collection(params['document']).deleteOne(filter);
        await handleResponse({ result: { ...result, _id }, res });
        debugger;
        break;
      case url.includes('/find'):
        debugger;
        result = await db
          .collection(params['document'])
          .find({})
          .toArray();
        await handleResponse({ result, res });

        debugger;
        break;
      default:
        res.setHeader('Content-Type', 'text/plain');
        res.end('Path no spesified\n');
    }
 
  } catch (error) {
    debugger;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(error));
    res.end();
  }
};
