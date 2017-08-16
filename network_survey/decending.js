var async = require('async');
var fs = require('fs');
var moment = require('moment-timezone');
var data = JSON.parse(fs.readFileSync('finalOutput.json', 'utf8'));
//var loc = JSON.parse(fs.readFileSync('is_retry.json', 'utf8'));
var math = require('mathjs');
//var sts1rssiArray = [];
//var sts1snrArray = [];
//data.forEach(function(item){
//for (var n in data){
//var i =0;
console.log(data.length)
var locID =1 ;
//async.each(loc,function(litem,lnext){
//locID++;
//	var count = 0;
//	var rsss = [];
//	var snr = [];
//    var i =0;
//	
async.each(data,function(item,dnext){
   var gdata = [];
   if(item.metadata.gateways){
   var gdata = item.metadata.gateways;
	}
	if(gdata.length > 0){
		gdata.sort(function (a, b) {
			return b.rssi - a.rssi;
		});
		item.metadata.gateways = gdata;
	}
	fs.open('finalOutputDescending.json', 'a', 666, function( e, id ) {
			//console.log(rsss)
			fs.write( id, JSON.stringify(item) + ',', null, 'utf8', function(){
	        // fs.write( id, litem.res + litem.site + 'count:' + count + 'snr:'+  snr + 'rssi:' +rsss + '\n', null, 'utf8', function(){
					
					fs.close(id, function(){
					console.log('file valid closed');
					dnext();
					
			})
		})
		})

})