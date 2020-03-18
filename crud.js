const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017';
const dbName = 'visa';
const client = new MongoClient(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
const getParams = require('./getParams');
function handleResponse({ result, res, statusCode }) {
  debugger;
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = statusCode;
  res.write(JSON.stringify(result));
  res.end();
}

module.exports = async function crudOperation(req, res, dbName) {
  debugger;
  let result = null;
  const params = getParams(req);
  let doc = req.body;
  //let _id = doc._id;
  const { url } = req;
  let filter = null;

  try {
    const clnt = await client.connect();
    const db = clnt.db(dbName);
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
        debugger;
        let obj = { ...doc };
        delete obj._id;
        filter = { _id: new ObjectID(doc._id) };
        const updateResult = await db
          .collection(params['document'])
          .updateOne(filter, { $set: { ...obj } });

        debugger;
        if (updateResult.result.nModified === 1) {
          debugger;
          await handleResponse({ result: {}, statusCode: 204, res });
        } else {
          debugger;
          await handleResponse({ result, statusCode: 304, res });
        }
        debugger;
        break;
      case url.includes('/deleteOne'):
        debugger;
        filter = { _id: new ObjectID(doc._id) };
        debugger;
        // const findOneResult = await db
        //   .collection(params['document'])
        //   .findOne({});
        // debugger;
        const deleteResult = await db
          .collection(params['document'])
          .deleteOne(filter);
        // const findAllResult = await db
        //   .collection(params['document'])
        //   .find({})
        //   .toArray();
        debugger;
        if (deleteResult.deletedCount === 1) {
          debugger;
          await handleResponse({ result: {}, statusCode: 202, res });
        } else {
          debugger;
          await handleResponse({ result: {}, statusCode: 404, res });
        }

        break;
      case url.includes('/find'):
        debugger;
        result = await db
          .collection(params['document'])
          .find({})
          .toArray();
        debugger;
        await handleResponse({ result, statusCode: 200, res });

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
