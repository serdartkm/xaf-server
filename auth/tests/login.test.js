require('babel-polyfill');

import httpRoute from '../../http-route';
const request = require('supertest');
describe('login.test.js', () => {
  it('empty useroremail and password 410,409', (done) => {
    request(httpRoute)
      .get('/auth/login')
      .set('Accept', 'application/json')
      .expect(400, { errors: ['410', '409'] })
      .end(done);
  });
  it('emailorusernameNotValid 410', (done) => {
    request(httpRoute)
      .get('/auth/login?password=DragondFFFly!&emailorusername=2333')
      .set('Accept', 'application/json')
      .expect(400, { errors: ['410'] })
      .end(done);
  });

  it('emailIsNotRegistered 408', (done) => {
    global.findOne = null;

    request(httpRoute)
      .get('/auth/login?password=DragondFFFly!&emailorusername=test@gmail.com')
      .set('Accept', 'application/json')
      .expect(400, { errors: ['408'] })
      .end(done);
  });
  it('usernameIsNotRegistered 411', (done) => {
    global.findOne = null;

    request(httpRoute)
      .get('/auth/login?password=DragondFFFly!&emailorusername=tkmhouse')
      .set('Accept', 'application/json')
      .expect(400, { errors: ['411'] })
      .end(done);
  });

  it('valid username wrong password 411', (done) => {
    global.findOne = { password: '123' }; //mongodb
    global.compare = false; //bcrypt

    request(httpRoute)
      .get('/auth/login?password=DragondFFFly!&emailorusername=tkmhouse')
      .set('Accept', 'application/json')
      .expect(400, { errors: ['401'] })
      .end(done);
  });

  it('valid email  and wrong password', (done) => {
    global.findOne = { password: '123' }; //mongodb
    global.compare = false; //bcrypt

    request(httpRoute)
      .get(
        '/auth/login?password=DragondFFFly!&emailorusername=tkmhouse@gmail.com'
      )
      .set('Accept', 'application/json')
      .expect(400, { errors: ['401'] })
      .end(done);
  });
  it('valid username  and valid password', (done) => {
    global.findOne = { password: 'DragondFFFly!', _id: '123' }; //mongodb
    global.compare = true; //bcrypt
    global.sign = 'test'; //jwt

    request(httpRoute)
      .get('/auth/login?password=DragondFFFly!&emailorusername=tkmhouse')
      .set('Accept', 'application/json')
      .expect(200, { token: 'test' })
      .end(done);
  });

  it('valid email  and valid password', (done) => {
    global.findOne = { password: 'DragondFFFly!', _id: '123' }; //mongodb
    global.compare = true; //bcrypt
    global.sign = 'test'; //jwt

    request(httpRoute)
      .get(
        '/auth/login?password=DragondFFFly!&emailorusername=tkmhouse@gmail.com'
      )
      .set('Accept', 'application/json')
      .expect(200, { token: 'test' })
      .end(done);
  });
});
