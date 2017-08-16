var async = require('async');
var fs = require('fs');
var moment = require('moment-timezone');
var data = JSON.parse(fs.readFileSync('finalOutput.json', 'utf8'));
var loc = JSON.parse(fs.readFileSync('loc.json', 'utf8'));
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
	if(litem.res == item.reserve && litem.site == item.site){
	 //item.deviceLocation = "in_car"
	//item.deviceLocation = "n.a "
	
	count = count + 1;
	if(item.metadata.gateways){
	var gdata = item.metadata.gateways;

	async.each(gdata,function(gitem,gnext){
		if(gitem.rssi){
		rsss.push(gitem.rssi);}
		if(gitem.snr){
		snr.push(gitem.snr);
		}
		gnext();
	})
	}
  }else if(i >= data.length && rsss.length ==0 && snr.length == 0){
  		fs.open('all.json', 'a', 666, function( e, id ) {
			//console.log(rsss)
			fs.write( id, '\n', null, 'utf8', function(){
	        // fs.write( id, litem.res + litem.site + 'count:' + count + 'snr:'+  snr + 'rssi:' +rsss + '\n', null, 'utf8', function(){
					
					fs.close(id, function(){
					console.log('file valid closed');
					
			})
		})
		})
  }
  if(i >= data.length && count != 0 && rsss.length !=0 && snr.length != 0)
	{
	
	fs.open('all.json', 'a', 666, function( e, id ) {
			//console.log(rsss)
			fs.write( id, count + '	 '+  math.min(rsss) + '	 ' + math.max(rsss) + '	 ' + (math.sum(rsss)/rsss.length) + '	' + math.std(rsss) + '	' + math.min(snr)  + '	'+ math.max(snr) + '	' + (math.sum(snr)/snr.length) + '	' + math.std(snr) +'\n', null, 'utf8', function(){
	        // fs.write( id, litem.res + litem.site + 'count:' + count + 'snr:'+  snr + 'rssi:' +rsss + '\n', null, 'utf8', function(){
					
					fs.close(id, function(){
					console.log('file valid closed');
					
					lnext()
			})
		})
		})
	} else{
	dnext();
	}
})

})