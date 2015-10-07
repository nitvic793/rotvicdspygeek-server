/**
* Chat.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    parent:{
      model:"Parents"
    },
    teacher:{
      model:"Teachers"
    },
    senderId:"STRING",
    sender:"STRING", //Teacher or Parent
    message:"STRING",
    time:"DATETIME"
  }
};
