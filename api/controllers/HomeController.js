/**
 * HomeController
 *
 * @description :: Main index logic
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	addSchool: function(req,res){
		return res.view('AddSchool');
	},
	addClass: function(req,res){
		School.find({}).exec(function(err,data){
			var payload = {schools:data};
			return res.view('AddClass',payload);
		});
	},
	addSubject: function(req,res){
		School.find({}).exec(function(err,data){
			var payload = {schools:data};
			return res.view('AddSubject',payload);
		});
	}
};
