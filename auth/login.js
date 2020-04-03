import apiurl from 'url';
import * as validations from './validations/validations';
import httpStatus from './http-status';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

export default async function({ req, res, collection }) {
  debugger
  let { emailorusername, password } = apiurl.parse(req.url, true).query;
  let errors = [];
  if (validations.isEmptyEmailOrUsername({ emailorusername })) {
    errors.push(httpStatus.emptyEmptyEmailOrUsername);
  }
  if (validations.isEmptyPassword({ password })) {
    errors.push(httpStatus.emptyPasword);
  }
  if (errors.length > 0) {
    res.status(400).send({ errors }); //
  } else {
    if (!validations.isValidUsernameOrEmail({ usernameoremail })) {
      errors.push(httpStatus.emailorusernameInvalid);
    }
    if (errors.length > 0) {
      res.status(400).send({ errors }); //
    } else {
      if (validations.isValidUsernameOrEmail({ emailorusername })) {
        if (validations.isValidEmail({ email: emailorusername })) {
          const user = await collection.findOne({ email });
          if (user === null) {
            errors.push(httpStatus.invalidCredentials);
            res.status(400).send({ errors }); //
          } else {
            const resBcrypt = await bcrypt.compare(password, user.password);

            if (resBcrypt) {
              const payload = { id: user._id.toString(), name: user.email };
              const token = await jwt.sign(payload, process.env.secret, {
                expiresIn: 31556926
              });
              res.status(200).send({ token });
            } else {
              errors.push(httpStatus.invalidCredentials);
              res.status(400).send({ errors });
            }
          }
        } else {
          const user = await collection.findOne({ username });
          if (user === null) {
            errors.push(httpStatus.invalidCredentials);
            res.status(400).send({ errors });
          } else {
            const resBcrypt = await bcrypt.compare(password, user.password);

            if (resBcrypt) {
              const payload = { id: user._id.toString(), name: user.email };
              const token = await jwt.sign(payload, process.env.secret, {
                expiresIn: 31556926
              });
              res.status(200).send({ token });
            } else {
              errors.push(httpStatus.invalidCredentials);
              res.status(400).send({ errors });
            }
          }
        }
      }
    }
  }
}
