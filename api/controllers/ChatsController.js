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
    function sendSocketMessage(userId){
      console.log("Sending to Socket: ",userId);
      if(sockets[userId]){
        sails.sockets.emit(sockets[userId],"message",{"status":"New Message"});
      }
    }
		Chats.create(req.body).exec(function(err,data){
			var pushToken;
			if(data.sender=='Teacher'){
				Parents.findOne({'id':req.body.parent}).exec(function(err,data){
          sendSocketMessage(req.body.parent);
					if(data.pushToken){
						var notification = {
							"tokens":[data.pushToken],
							"notification":{
								"title": "Message from " + data.firstname,
								"alert":req.body.message
								}
						};
						ionicPushServer(credentials, notification);
					}
				});
			}
			else{
				Teachers.findOne({'id':req.body.teacher}).exec(function(err,data){
          sendSocketMessage(req.body.teacher);
					if(data.pushToken){
						var notification = {
							"tokens":[data.pushToken._token],
							"notification":{
								"title": "Message from " + data.firstname,
								"alert":req.body.message
								}
						};
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
