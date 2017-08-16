var async = require('async');
var fs = require('fs');
var moment = require('moment-timezone');
var data = JSON.parse(fs.readFileSync('testDataUAT.json', 'utf8'));


async.each(data,function(item,next){

	//setTimeout(function () { 
	//if (timeC >= start && timeC <= end) {
	//console.log(item.metadata.time)
	if(item.is_retry){
			fs.open('is_retry.json', 'a', 666, function( e, id ) {
			fs.write( id, JSON.stringify(item) + ',' , null, 'utf8', function(){
			//fs.write( id,',', null, 'utf8', function(){
					fs.close(id, function(){
					console.log('file valid closed');
					next();
				//})
			})
		})
	})
	}
	else {
				fs.open('original.json', 'a', 666, function( e, id ) {
			fs.write( id, JSON.stringify(item) + ',' , null, 'utf8', function(){
			//fs.write( id,',', null, 'utf8', function(){
					fs.close(id, function(){
					console.log('file valid closed');
					next();
				//})
			})
		})
	})
	}
	
	
})