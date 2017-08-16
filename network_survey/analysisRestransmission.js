var async = require('async');
var fs = require('fs');
var moment = require('moment-timezone');
var data = JSON.parse(fs.readFileSync('original.json', 'utf8'));
var loc = JSON.parse(fs.readFileSync('is_retry.json', 'utf8'));
var math = require('mathjs');
//var sts1rssiArray = [];
//var sts1snrArray = [];
//data.forEach(function(item){
//for (var n in data){
//var i =0;
console.log(data.length)
var locID =1 ;
async.each(loc,function(litem,lnext){
locID++;
	var count = 0;
	var rsss = [];
	var snr = [];
    var i =0;
	
	async.each(data,function(item,dnext){
    i ++; 
	if(litem.counter == item.counter && litem.dev_id == item.dev_id && litem.payload_raw == item.payload_raw){
	 //item.deviceLocation = "in_car"
	//item.deviceLocation = "n.a "
	
	count = count + 1;


	}
  else if(i >= data.length && count == 0){
  		fs.open('restransmissionFalse.json', 'a', 666, function( e, id ) {
			//console.log(rsss)
			fs.write( id,  JSON.stringify(litem) + '\n', null, 'utf8', function(){
	        // fs.write( id, litem.res + litem.site + 'count:' + count + 'snr:'+  snr + 'rssi:' +rsss + '\n', null, 'utf8', function(){
					
					fs.close(id, function(){
					console.log('file invalid closed');
					
			})
		})
		})
  }
  if(i >= data.length && count != 0 )
	{
	
	fs.open('restransmissionTrue.json', 'a', 666, function( e, id ) {
			//console.log(rsss)
			fs.write( id,  JSON.stringify(litem) + ':' + JSON.stringify(item) +'\n', null, 'utf8', function(){
	        // fs.write( id, litem.res + litem.site + 'count:' + count + 'snr:'+  snr + 'rssi:' +rsss + '\n', null, 'utf8', function(){
					
					fs.close(id, function(){
					console.log('file valid closed' , count);
					
					lnext()
			})
		})
		})
	} else{
	dnext();
	}
})

})