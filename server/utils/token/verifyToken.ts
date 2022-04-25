const { verify } = require('jsonwebtoken');

const verifyToken = (token: string) => new Promise((resolve, reject) => {
  verify(token, process.env.SECRET, (err: Error, decoded: object) => {
    if (err) {
      reject(
        err,
      );
    } else {
      resolve(decoded);
    }
  });
});
export default verifyToken;
