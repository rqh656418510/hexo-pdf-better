/**
* hexo-pdf-better
* https://github.com/rqh656418510/hexo-pdf-better
* Copyright (c) 2015, superalsrk
* Licensed under the MIT license.
* Syntax:
* {% pdf http://yourdoman.com/x.pdf %} %}
**/

var fs = require('fs');
var ejs = require('ejs');
var path = require('path');

var enable = true;
var width = "100%";
var height = "550px";
var config = hexo.config.pdf;

if(config && !config.enable){
  enable = false;
}

if(config && config.width){
  width = config.width;
}

if(config && config.height){
  height = config.height;
}

hexo.extend.tag.register('pdf', function(args){
  if(!enable){
    return;
  }
  
  var htmlTmlSrc = path.join(__dirname, 'reader.ejs');
  var htmlTml = ejs.compile(fs.readFileSync(htmlTmlSrc, 'utf-8'));

  var type = 'normal';
  var pdfLink = args[0];

  if (pdfLink.indexOf('.pdf') > 0) {
  	type = 'normal';
  }
  else if(pdfLink.indexOf('drive.google.com') > 0) {
  	type = 'googledoc';
  }
  else if(pdfLink.indexOf('www.slideshare.net') > 0) {
  	type = 'slideshare';
  }

  return htmlTml({"src": args[0], "type" : type, "width" : width, "height" : height});
});