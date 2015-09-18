module.exports = function(req,res,next){
  if (req.body.password !== req.body.confirmPassword) {
      return res.json(401, {err: 'Password doesn\'t match, What a shame!'});
    }
    User.create(req.body).exec(function (err, user) {
      if (err) {
        return res.json(err.status, {err: err, statusText:'failed'});
      }
    });
  next();
}
