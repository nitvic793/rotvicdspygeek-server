/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var ionicPushServer = require('ionic-push-server');
var credentials = {
    IonicApplicationID : "75748798",
    IonicApplicationAPIsecret : "d6592183b787f804ee0fad1710967014adbe7fc02d9968e0"
};

module.exports = {
	sayHi: function(req, res) {
	    var friendId = req.param('friendId');
	    sails.sockets.emit(friendId, 'privateMessage', {from: req.session.userId, msg: 'Hi!'});
	    res.json({
	      message: 'Message sent!'
	    });
	},
	'get /__getcookie': function(req, res, next){
    res.send('_sailsIoJSConnect();');
	},
	createChat: function(req,res){

		console.log(req.body);
		Chat.create(req.body).exec(function(err,data){
			var pushToken;
			if(data.sender=='Teacher'){
				Parents.findOne({'id':req.body.parent}).exec(function(err,data){
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
			else{
				Teachers.findOne({'id':req.body.teacher}).exec(function(err,data){
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
	}
};
