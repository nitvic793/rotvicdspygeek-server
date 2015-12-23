function isOfficeTime(fromTime, toTime){
    var from = new Date(fromTime);
    var to = new Date(toTime);
    from = new Date(0,0,0,from.getHours(),from.getMinutes(), from.getSeconds(),0);
    to = new Date(0,0,0,to.getHours(),to.getMinutes(), to.getSeconds(),0);
    var now = new Date();
    var current = new Date(0,0,0,now.getHours(),now.getMinutes(),now.getSeconds(),0);
    if(current>from && current<to){
        console.log("office time!");
        return true;
    }
    else{
        console.log("Free!");
        return false;
    }
}

module.exports.isOfficeHours = function (settings){
  if(settings==null || !settings){
    return false;
  }
 settings.fromTime = new Date(settings.fromTime);
 settings.toTime = new Date(settings.toTime);
 var isItTime = isOfficeTime(settings.fromTime,settings.toTime);
 switch (new Date().getDay()) {
   case 0:
     return settings.sunday && isItTime;
     break;
   case 1:
     return settings.monday && isItTime;
     break;
   case 2:
     return settings.tuesday && isItTime;
     break;
   case 3:
     return settings.wednesday && isItTime;
     break;
   case 4:
     return settings.thursday && isItTime;
     break;
   case 5:
     return settings.friday && isItTime;
     break;
   case 6:
     return settings.saturday && isItTime;
     break;
   default:
     return false;
 }
}
