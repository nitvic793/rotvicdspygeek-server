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
    function getUser(id,cb){
      console.log(id);
      Parents.findOne({user:id}).exec(function(err,data){
        if(err || typeof data === 'undefined'){
          var search = {user:id};
          console.log(search);
          Teachers.findOne(search).exec(function(err,data){ //No clue why this works!
            cb(data);
          });
        }
        else{
          cb(data);
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
			getUser(req.body.to, function(data){
          sendSocketMessage(req.body.to,req.body);
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
			res.json(data);
		});
	},
  sendGroupChat: function(req,res){
    //NOTE: Need to make these functions as services
    function sendSocketMessage(userId, message){
      if(sockets[userId]){
        console.log("Sending to Socket: ",userId, sockets[userId]);
        try{
        sails.sockets.emit(sockets[userId],"groupMessage",message);
        }
        catch(e){
          console.log("Exception: ",e);
        }
      }
    }
    function getUser(id,cb){
      console.log(id);
      Parents.findOne({user:id}).exec(function(err,data){
        if(err || typeof data === 'undefined'){
          var search = {user:{contains:id}};
          Teachers.findOne(search).exec(function(err,data){ //No clue why this works!
            cb(data);
          });
        }
        else{
          cb(data);
        }
      });
    }
    function sendPush(users, message, groupName){
      users.forEach(function(a,i,val){
        getUser(a.id, function(data){
          if(data.pushToken){
						var notification = {
							"tokens":[data.pushToken],
							"notification":{
								"title": "Group Message from " + groupName,
								"alert": "Group Message from " + groupName
              }
						};
            console.log("Message sent to " + data.firstname);
						ionicPushServer(credentials, notification);
            sendSocketMessage(a.id,message);
          }
        });
      });
    }

    Chats.create(req.body).exec(function(err,data){
      Groups.findOne({id:req.body.group}).populate('users').exec(function(err,group){
        console.log("Users in group:");
        console.log(group.users);
        sendPush(group.users, req.body, group.groupName);
        return res.json(data);
      });
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
