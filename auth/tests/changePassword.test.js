require('babel-polyfill');

import httpRoute from '../../http-route';
const request = require('supertest');

describe('changePassword', () => {
  describe('with token', () => {
    it.only('token expired 413', (done) => {
      global.sign = 'testtoken';
      global.verify = Promise.reject({ message: 'jwt expired' });
      global.findOneAndUpdate = { value: { email: '' } };
      debugger;
      request(httpRoute)
        .put('/auth/changepass/')
        .send({
          token: 'mytoken',
          emailorusername: '',
          password: '',
          current: '',
          confirm: '',
        })
        .set('Accept', 'application/json')
        .expect(500)
        .end((res, err) => {
          let er = err;
          debugger;
        });
    });
    it.todo('token not valid 414');
  });

  describe('with emailorusername and password', () => {
    it.todo('usernameoremail, current,password,confirm is empty');
    it.todo('usernameoremail,current, password not valid');
    it.todo('confirm do not match');
    it.todo('success password change');
  });
});
