import jwt from 'jsonwebtoken';

/**
   * verifies user token
   * @param {object} request object
   * @param {object} response object
   * @param {object} next object
   *
   * @returns {json} json
   */
// eslint-disable-next-line consistent-return
const verifyToken = (request, response, next) => {
  const { token } = request.headers;
  if (token) {
    // eslint-disable-next-line consistent-return
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return response.status(401).json({
          status: 401,
          error: 'Failed to authenticate token.',
        });
      }
      request.decoded = decoded;
      next();
    });
  } else {
    return response.status(401).json({
      status: 401,
      error: 'No token provided.',
    });
  }
};


export default verifyToken;
