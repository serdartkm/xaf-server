const { MongoClient } = require('mongodb');
const request = require('supertest');
const httpRoute = require('../http-route');
var ObjectId = require('mongodb').ObjectID;

describe('mongoDB', () => {
  let connection;
  var id = new ObjectId();

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });


  it('should handle insertOne api call', async done => {
    debugger;
    let db = await connection.db('testinsertone');
    await db.collection('employee').deleteMany({});

    request(httpRoute('testinsertone'))
      .post('/insertOne?document=employee')
      .send({ firstName: 'dragos', lastName: 'mario', _id: id })
      .set('Accept', 'application/json')

      .expect('Content-Type', /json/)
      .expect(201, { _id: id.toString() })
      .expect(201, done);
  });

  it('should handle find api call', async function(done) {
    debugger;
    let db = await connection.db('testingfind');
    const employee = db.collection('employee');
    const mockEmployee = { _id: id, firstName: 'John', lastName: 'Doeq' };
    await db.collection('employee').deleteMany({});
    await employee.insertOne(mockEmployee);
    request(httpRoute('testingfind'))
      .get('/find?document=employee')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(
        200,
        JSON.stringify([{ _id: id, firstName: 'John', lastName: 'Doeq' }])
      )
      .end(done);
  });

  it('should handle updateOne api call', async done => {
    debugger;
    let db = await connection.db('testingUpdateOne');
    await db.collection('employee').deleteMany({});
    const employee = db.collection('employee');
    const mockEmployee = { firstName: 'John', lastName: 'Doe' };
    debugger;
    const insertResult = await employee.insertOne(mockEmployee);
    debugger;
    request(httpRoute('testingUpdateOne'))
      .put('/updateOne?document=employee')
      .send({ _id: insertResult.insertedId, firstName: 'Johnson', lastName: 'Doe' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(204)
      .end(done);
  });

  it('should handle deleteOne api call',async(done)=>{
    debugger;
    let db = await connection.db('testingDeleteOne');
    await db.collection('employee').deleteMany({});
    const employee = db.collection('employee');
    const mockEmployee = { firstName: 'John', lastName: 'Doe' };
    debugger;
    const insertResult = await employee.insertOne(mockEmployee);
    debugger;
    request(httpRoute('testingDeleteOne'))
      .delete('/deleteOne?document=employee')
      .send({ _id: insertResult.insertedId, firstName: 'Johnson', lastName: 'Doe' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(202)
      .end(done); 
  })

});


