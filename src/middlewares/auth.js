const httpStatus = require('http-status');
const { tokenService } = require('../services');
const ApiError = require('../utils/ApiError');

const auth = async (req, res, next) => {
  const jwttoken = req.header('x-auth-token');

  // Check if not token
  if (!jwttoken) {
    return next(
      new ApiError(httpStatus.UNAUTHORIZED, 'No authorization header'),
    );
  }

  // Verify token
  try {
    await tokenService.verifyToken(jwttoken);
    next();
  } catch (err) {
    return next(new ApiError(httpStatus.UNAUTHORIZED, err));
  }
};

module.exports = { auth };
