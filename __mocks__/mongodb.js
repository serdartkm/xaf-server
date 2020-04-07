import { JsonWebTokenError } from 'jsonwebtoken';

export class MongoClient {
  connect = () => {
    return {
      db: () => {
        return {
          collection: () => {
            return {
              findOne: function () {
                debugger;
                return global.findOne;
              },
              insertOne: () => {
                return global.insertOne;
              },
            };
          },
        };
      },
    };
  };
}
