/**
* NoticeBoard.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    class: {
      model:"Class"
    },
    teacher: {
      model:"Teachers"
    },
    images:{
      type:"array"
    },
    announcement:"STRING", //Teacher or Parent
    time:"DATETIME"
  }
};
