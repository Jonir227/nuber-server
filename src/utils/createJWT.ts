import jwt from 'jsonwebtoken';

const createJWT = (id: number): string => {
  const token = jwt.sign(
    {
      id
    },
    process.env.PASSWORD_JWT_KEY || ''
  );
  return token;
};

export default createJWT;
