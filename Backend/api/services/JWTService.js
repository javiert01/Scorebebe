/*eslint linebreak-style: ["error", "windows"]*/
const jwt = require('jsonwebtoken');
const SECRET = '1234';
module.exports = {
  issuer(payload, expiresIn){
    return jwt.sign(payload, SECRET, {
      expiresIn
    });
  },
  verify(token){
    return jwt.verify(token, SECRET);
  }
};