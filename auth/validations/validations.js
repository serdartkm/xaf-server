import { emailRegex, usernameRegex, passwordRegex } from './validationRegex';

export function isValidUsername({ emailorusername }) {
  const username = new RegExp(usernameRegex);
  if (username.test(emailorusername)) {
    return true;
  } else {
    return false;
  }
}

export function isValidEmail({ email }) {
  const eml = new RegExp(emailRegex);
  if (eml.test(email)) {
    return true;
  } else {
    return false;
  }
}
export function isValidPasspword({ password }) {
  const psw = new RegExp(passwordRegex);
  if (psw.test(password)) {
    return true;
  } else {
    return false;
  }
}

export function isEmptyEmailOrUsername({ emailorusername }) {
  if (
    emailorusername === '' ||
    emailorusername === undefined ||
    emailorusername === null
  ) {
    return true;
  } else {
    return false;
  }
}

export function isEmptyPassword({ password }) {
  if (password === '' || password === undefined || password === null) {
    return true;
  } else {
    return false;
  }
}

export function isValidUsernameOrEmail({ emailorusername }) {
  debugger
  const email = new RegExp(emailRegex);
  const username = new RegExp(usernameRegex);
  if (email.test(emailorusername) || username.test(emailorusername)) {
    return true;
  } else {
    return false;
  }
}
