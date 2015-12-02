/**
 * ChatsController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 var ionicPushServer = require('ionic-push-server');
 var credentials = {
     IonicApplicationID : "75748798",
     IonicApplicationAPIsecret : "d6592183b787f804ee0fad1710967014adbe7fc02d9968e0"
 };

var sockets = []; //HACK!

module.exports = {
	createChat: function(req,res){

    function getUsers(parentId,teacherId, cb){
      Parents.findOne({id:parentId}).exec(function(err,parent){
        if(!err){
          Teachers.findOne({'id':teacherId}).exec(function(err,teacher){
            if(!err){
              cb(parent,teacher);
            }
            else{
              cb(parent,null);
            }
          });
        }
        else{
          cb(null,null);
        }
      });
    }

    function sendSocketMessage(userId, message){
      console.log("Sending to Socket: ",userId, sockets[userId]);
      if(sockets[userId]){
        try{
        sails.sockets.emit(sockets[userId],"message",message);
        }
        catch(e){
          console.log("Exception: ",e);
        }
      }
    }
		Chats.create(req.body).exec(function(err,data){
      console.log(data);
			var pushToken;
			if(data.sender=='Teacher'){
				Parents.findOne({'id':req.body.parent}).exec(function(err,data){
          sendSocketMessage(req.body.parent,req.body);
					if(data.pushToken){
						var notification = {
							"tokens":[data.pushToken],
							"notification":{
								"title": "Message from " + data.firstname,
								"alert": "Message from " + data.firstname
              }
						};
            console.log("Message from " + data.firstname);
						ionicPushServer(credentials, notification);
					}
				});
			}
			else{
				Teachers.findOne({'id':req.body.teacher}).exec(function(err,data){
          sendSocketMessage(req.body.teacher,req.body);
					if(data.pushToken){
						var notification = {
							"tokens":[data.pushToken],
							"notification":{
								"title": "Message from " + data.firstname,
								"alert": "Message from " + data.firstname
              }

						};
            console.log("Message from " + data.firstname);
						ionicPushServer(credentials, notification);
					}
				});
			}
			res.json(data);
		});
	},
  getSocketID: function(req, res) {
    if (!req.isSocket) return res.badRequest();
    var socketId = sails.sockets.id(req.socket);
    return res.json({socketId:socketId});
  },
  registerSocket: function(req,res){
    if(req.body.userId && req.body.socketId){
      sockets[req.body.userId] = req.body.socketId;
      res.json({"status":"registered"});
      console.log(sockets);
    }
    else {
      res.badRequest();
    }
  }
};
