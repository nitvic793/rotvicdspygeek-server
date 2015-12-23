var sendgrid  = require('sendgrid')("bitstax", "Abcd1234");

module.exports = function(req,res,next){
  if (req.body.password !== req.body.confirmPassword) {
      console.log('Password mismatch!');
      return res.json(401, {err: 'Password doesn\'t match, What a shame!'});
    }
    User.create(req.body).exec(function (err, user) {
      if (err) {
        console.log(err);
        return res.json(err.status, {err: err, statusText:'failed'});
      }
      else {
        next();
      }
    });

}
