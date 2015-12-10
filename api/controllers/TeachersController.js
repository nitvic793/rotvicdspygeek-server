/**
 * TeachersController
 *
 * @description :: Server-side logic for managing Teachers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req,res){
    console.log("Custom Teacher create");
    Teachers.create(req.body).exec(function(errP,teacher){
      if(errP){
        return res.serverError();
      }
      User.findOne({email:req.body.email}, function(errU, user){
        if(errU){
          return res.serverError();
        }
        teacher.user = user.id;
        Teachers.update({id:teacher.id}, teacher).exec(function(errPu,teacherU){
          if(errPu){
            return res.serverError();
          }
          else{
            return res.json({statusText:"Created"});
          }
        });
      });
    });
  }
};
