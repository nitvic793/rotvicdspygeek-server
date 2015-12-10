/**
 * GroupsController
 *
 * @description :: Server-side logic for managing Groups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getGroupsWithUser:function(req,res){
		var userId = req.param('user');
		if(!userId || userId==''){
			return res.badRequest();
		}
		Groups.find({}).populate('users').exec(function(err,groups){
			var filtered = [];
			var n=0;
			//Highly unoptimized code - need to make this faster
			for(i=0;i<groups.length;++i){
				for(j=0;j<groups[i].users.length;++j){
					if(groups[i].users[j].id==userId){
						filtered[n] = groups[i];
						n++;
					}
				}
			}
			return res.json(filtered);
		});
	}
};
