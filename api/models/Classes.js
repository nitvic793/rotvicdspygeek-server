/**
* Classes.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    standard:"STRING",
    section:"STRING", //Need to add reference to school here
    school:{
      model:"Schools"
    }
  }
};
