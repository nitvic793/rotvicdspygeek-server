/**
* Student.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    firstName:"STRING",
    lastName:"STRING",
    email:{
      type: 'email',
      required: 'true',
      unique: true // Yes unique one
    },
    registrationNo: "STRING",
    class:{
        model:"Classes"
    },
    school:{
      model:"Schools"
    }
  }
};
