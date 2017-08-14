var asyncLoop = require('node-async-loop');
var fs = require('fs');
var moment = require('moment-timezone');

var start = moment('2017-08-03T08:30:00.000000000Z').subtract(600,'minutes').toISOString();
var end =   moment('2017-08-03T08:34:00.000000000Z').subtract(600,'minutes').toISOString();

var data = JSON.parse(fs.readFileSync('mergedData.json', 'utf8'));
var  i = 0;

asyncLoop(data, function (item, next){
 i++;
 var timeC = item.metadata.time; 

 if (timeC >= start && timeC <= end) {
  if(item.hardware_serial = "000DB531147C353F"){
  item.deviceLocation = "above_ground"
  // item.deviceLocation = "in_car"
  //item.deviceLocation = "n.a "
  }
  if(item.hardware_serial = "000DB531136A3569"){
   // item.deviceLocation = "above_ground"
   item.deviceLocation = "in_ground"
   // item.deviceLocation = "in_car"
  // item.deviceLocation = "n.a "
  }
  if(item.hardware_serial = "000DB5311362354F"){
  //item.deviceLocation = "above_ground"
   item.deviceLocation = "in_ground"
   // item.deviceLocation = "in_car"
  // item.deviceLocation = "n.a"
  }
  if(item.hardware_serial = "000DB531136D3542"){
  item.deviceLocation = "above_ground"
   // item.deviceLocation = "in_car"
   //item.deviceLocation = "n.a "
  }
  if(item.hardware_serial = "000DB53113633552"){
   item.deviceLocation = "in_car"
  }
  if(item.hardware_serial = "008000000000BEBF"){
   item.deviceLocation = "test_device"
  }
 
  item.reserve = "Wongowallen Conservation Area"
  item.site = "Crystal Creek - stop 3, trap site 3"
  
  fs.open('mergedDataFilteredTime.json', 'a', 666, function( e, id ) {
        fs.write( id, JSON.stringify(item), null, 'utf8', function(){
         fs.write( id,',', null, 'utf8', function(){
                fs.close(id, function(){
                console.log('file valid closed');
				if(i <= data.length){
				next();
				}
			})
		})
	})
 })
 }else{
			if(i <= data.length){
				next();
				}
}
})