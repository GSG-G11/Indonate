import { sign } from 'jsonwebtoken';

const signToken = (payload: object) => new Promise((resolve, reject) => {
  resolve(
    sign(
      payload,
        process.env.SECRET as string,
        {
          expiresIn: '30d',
          algorithm: 'HS256',
        },
        (err, encoded) => {
          if (err) reject(err);
          else resolve(encoded);
        },
    ),
  );
});

export default signToken;
