/**
* Groups.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    groupName:"STRING",
    teachers:{
      collection:"Teachers"
    },
    parents:{
      collection:"Parents"
    },
    groupOwner:{
      model:"User"
    } //Id of group owner. Since it could be
  }
};
