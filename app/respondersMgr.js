var fs = require('fs');
var path = require('path');
var async = require('async');

module.exports = {
  init: function(voicebox){
    var respondersFolder = path.join(process.env.HOME, '.voicebox/');
    fs.stat(respondersFolder, function(err, stats){
      if(err){
        fs.mkdir(respondersFolder,function(err){
          if(err)
            throw new Error('Error while creating the voicebox responders folder');
          });
      }else{
        async.each(fs.readdirSync(respondersFolder), function(responder, cb){          
          require(path.join(respondersFolder,responder,'responder.js'))(voicebox);
        }, function(err){
          if(err)
            throw new Error('Error while reading the voicebox responders folders');
        });
      }
    });
  } 
}