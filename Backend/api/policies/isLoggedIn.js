/*eslint linebreak-style: ["error", "windows"]*/
module.exports = async function(req, res, next) {
    if(!req.headers && !req.headers.authorization) {
      return res.badRequest({err: 'authorization header is missing'});
    }
    const tokenParam = req.header.authorization;
    const decodedToken = JWTService.verify(tokenParam);
    const user = await Usuario.findOne({
      id: decodedToken.user
    });
    if(!user){
      return next({err:'unauthorized'});
    }
    req.user = user.id;
    next();
  };