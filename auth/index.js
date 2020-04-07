/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import 'babel-polyfill';
const bcrypt = require('bcrypt');
const ObjectID = require('mongodb').ObjectId;
import apiurl from 'url';
import login from './login';
import signup from './signup';
const changePassword = require('./changePassword');

const profile = require('./profile');
const recover = require('./recover');

export default function (req, res) {
  const { url } = req;
  const collectionName = 'users';
  const database = req.client.db('auth');
  const collection = database.collection(collectionName);
  debugger;
  switch (true) {
    case url.includes('/login'):
      debugger;
      login({ req, res, collection });
      break;
    case url.includes('/signup'):
      signup({ req, res, collection });
      break;
    case url.includes('/changepassword'):
      changePassword({ req, res, collection });
      break;
    case url.includes('/recover'):
      recover({ req, res, collection });
      break;
    case url.includes('/profile'):
      profile({ req, res, collection });
      break;
    default:
      return null;
  }
}
