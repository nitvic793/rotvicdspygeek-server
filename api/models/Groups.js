/**
* Groups.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    groupName:"STRING",
    users:{
      collection:"User"
    },
    //NOTE: need to make above as just a collection of users instead of teachers/parents distinction. This will mean changing the chat system to align with it.
    groupOwner:{
      model:"User"
    } //Id of group owner.
  }
};
