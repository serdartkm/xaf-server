import { JsonWebTokenError } from 'jsonwebtoken';

export class MongoClient {
  connect = () => {
    return {
      db: () => {
        return {
          collection: () => {
            return {
              findOne: function () {
                return global.findOne;
              },
            };
          },
        };
      },
    };
  };
}
