import authSeedOperation from './auth/authSeedOperation';
export default function authSeed(req, res) {
  const { url } = req;
  switch (true) {
    case url.includes('/authseed'):
      authSeedOperation(req, res);
      break;
    default:
      null;
  }
}
