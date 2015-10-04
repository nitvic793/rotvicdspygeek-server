/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

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
	}
};
