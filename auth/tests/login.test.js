require('babel-polyfill');

import httpRoute from '../../http-route';
const request = require('supertest');
describe('login.test.js', () => {
  it('empty useroremail and password', done => {
    debugger;
    request(httpRoute)
      .get('/auth/login')
      .end(done);
  });
  it.todo('invalid usernameoremail');

  it.todo('valid email but not registered');
  it.todo('invalid username but not registered');

  it.todo('valid email invalid password');
  it.todo('valid username invalid password');

  it.todo('valid email  and valid password');
  it.todo('valid username  nad valid password');
});
