/**
* Chats.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    from:{
      model:"User"
    },
    to:{
      model:"User"
    },
    message:"STRING",
    time:"DATETIME",
    group:{
      model:"Groups"
    }
  }
};
