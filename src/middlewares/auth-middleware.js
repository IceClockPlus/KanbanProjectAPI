const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const authorize = (req, res, next) => {
  const tokenHeaders = req.headers['authorization'];
  if(!tokenHeaders.includes('Bearer')) return res.status(401).json({message: 'Unauthorized: Invalid token'});
  const token = tokenHeaders.split(' ')[1];

  if(!token) return res.status(401).json({message: 'Unauthorized access: No token provided'});

  jwt.verify(token, secretKey, { algorithm: 'HS256' }, (err, decoded) => {
    if(err){
      return res.status(401).json({message: 'Unauthorized: Invalid token'});
    }  else {
      req.user = decoded;
      next();
    }
  });
}

module.exports.authorize = authorize;