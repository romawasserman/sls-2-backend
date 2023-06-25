import { decodeAccessToken } from '../helpers/jwtHelper.js';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Missing or invalid authorization header' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = decodeAccessToken(token)
    req.userEmail = decodedToken.userEmail;
    next();
  } catch (error) {
    return res.status(401).json({success: false, error: 'Invalid token' });
  }
};

export default authenticateToken;
