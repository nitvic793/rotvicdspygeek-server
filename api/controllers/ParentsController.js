/**
 * ParentsController
 *
 * @description :: Server-side logic for managing parents
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create: function(req,res){
    console.log("Custom Parent create");
    Parents.create(req.body).exec(function(errP,parent){
      if(errP){
        console.log("Could not create Parent!");
        return res.serverError();
      }
      User.findOne({email:req.body.email}, function(errU, user){
        if(errU){
          console.log("Could not find user object");
          return res.serverError();
        }
        parent.user = user.id;
        Parents.update({id:parent.id}, parent).exec(function(errPu,parentU){
          if(errPu){
            console.log("Could not bind user object to Parent.");
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
