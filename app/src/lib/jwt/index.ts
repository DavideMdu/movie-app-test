import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const createJWT = (userId: number, email: string) => {
  const payload = { userId, email };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};

export const verifyJWT = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.log(error);
    return null;
  }
};
