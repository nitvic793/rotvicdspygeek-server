/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var sendgrid  = require('sendgrid')("bitstax", "Abcd1234");
module.exports = {
  index: function (req, res) {
    var email = req.param('email');
    var password = req.param('password');
    var userType = req.param('userType');
    console.log(userType);

    if (!email || !password) {
      return res.json(401, {err: 'email and password required'});
    }

    User.findOne({email: email}, function (err, user) {
      if (!user) {
        return res.json(401, {err: 'invalid email or password'});
      }

      User.comparePassword(password, user, function (err, valid) {
        if (err) {
          return res.json(403, {err: 'forbidden'});
        }

        if (!valid) {
          return res.json(401, {err: 'invalid email or password'});
        } else {

          if(userType=='Parent')
          {
            Parents.findOne({email:email} , function(err,parent){
              if (!parent) {
                return res.json(401, {err: 'invalid email or password'});
              }
              else {
                res.json({
                  userType: userType,
                  model: parent,
                  user: user,
                  token: jwToken.issue({id : user.id })
                });
              }
            });
          }
          else {
            Teachers.findOne({ email: email }, function(err,teacher){ //Apparently adding an 's' fixes things. Fuck you Heroku!
              if (!teacher) {
                return res.json(401, {err: 'invalid email or password'});
              }
              else {
                res.json({
                  userType: userType,
                  model: teacher,
                  user: user,
                  token: jwToken.issue({id : user.id })
                });
              }
            });
          }

        }
      });
    })
  },
  test: function(req,res){
    return res.json({t:Teacher});
  },
  sendEmail: function(req,res){
    var payload   = {
      to      : 'nithishvictor@gmail.com',
      from    : 'support@bitstax.io',
      subject : 'Saying Hi',
      text    : 'This is my first email through SendGrid'
    } ;
    sendgrid.send(payload, function(err, json) {
      if (err) { console.error(err); }
      console.log(json);
    });
    return res.ok();
  }


};
