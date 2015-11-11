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
		Schools.find({}).exec(function(err,data){
			var payload = {schools:data};
			return res.view('AddClass',payload);
		});
	},
	addSubject: function(req,res){
		Schools.find({}).exec(function(err,data){
			var payload = {schools:data};
			return res.view('AddSubject',payload);
		});
	},
	addStudent: function(req,res){
		Schools.find({}).exec(function(err,data){
			Class.find({}).exec(function(err,classes){
				var payload = {schools:data, clses:classes};
				return res.view('AddStudent',payload);
			});
		});
	}
};
