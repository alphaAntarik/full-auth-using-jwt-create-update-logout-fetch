const jwt = require('jsonwebtoken')
exports.isAuthenticated = (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    const error = new Error('Authorization header is missing');
    error.statusCode = 401;
    return next(error);
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    const error = new Error('Token is missing in Authorization header');
    error.statusCode = 401;
    return next(error);
  }

  try {
    const decodedToken = jwt.verify(token, 'supersecretkey');
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
};
