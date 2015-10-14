/**
 * ImageController
 *
 * @description :: Server-side logic for managing Images
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var fs = require("fs");
var cloudinary = require('cloudinary');
module.exports = {
	upload: function(req,res){
		cloudinary.config({
  		cloud_name: 'bitstax',
  		api_key: '755214483942831',
  		api_secret: '3iMMFs3rt38w0pOxcQAwY7kz4B4'
		}); //Temporary solution
		req.file('image').upload(function (err, files) {
		 if (err)
			 return res.serverError(err);
			var result = {
 			 message: files.length + ' file(s) uploaded successfully!',
 			 files: files
 		 };
		 files.forEach(function(val,i,a){
			 cloudinary.uploader.upload(val.fd, function(cresult) {
					var imageObj = {
						name:val.filename,
						url:cresult.secure_url
					};
					Image.create(imageObj).exec(function(err,data){
						console.log(data);
					});
					fs.unlink(val.fd);
		 	 });
		 });
		  return res.json(result);
	 });
	}
};
