const request = require('supertest');
const httpRoute = require('../http-route');
var ObjectId = require('mongodb').ObjectID
describe('insert', () => {
  it('should handle insertOne api call', done => {
    var id = new ObjectId();
    debugger;
    request(httpRoute)
      .post('/insertOne?document=employee')
      .send({ firstName: 'dragos', lastName: 'mario',_id:id })
      .set('Accept', 'application/json')

      .expect('Content-Type', /json/)
      .expect(201,{_id:id.toString()})
      .expect(201, done);
  });
});
