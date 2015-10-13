/**
 * ImageController
 *
 * @description :: Server-side logic for managing Images
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var fs = require("fs");
module.exports = {
	upload: function(req,res){
		req.file('image').upload(function (err, files) {
		 if (err)
			 return res.serverError(err);
			var result = {
 			 message: files.length + ' file(s) uploaded successfully!',
 			 files: files
 		 };
		 files.forEach(function(val,i,a){
			 fs.unlink(val.fd);
		 });
		 console.log("upload", result);
		 return res.json(result);
	 });
	}
};
