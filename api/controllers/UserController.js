/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	changePassword: function(req,res){
    var email = req.param('email');
    var password = req.param('password');
		var confirmPassword = req.param('confirmPassword');
    if(!email || !password){
      return res.json(401, {err: 'email and password required'});
    }
		if(password != confirmPassword){
      return res.json(401, {err: 'Password mismatch!'});
    }

		User.findOne({email: email}, function (err, user) {
      if (!user) {
        return res.json(401, {err: 'invalid email'});
      }
			if(err){
				return res.json(500, {err:"Server error"});
			}
			user.password = password;
			if(user.password)
			User.update({email:email},user).exec(function(err,data){
				if(err){
					return res.json(500, {err:"Server error"});
				}
				else{
					return res.json({status:"Updated password"});
				}
			});
		});
  }
};
