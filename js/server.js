var http = require('http');
var url = require('url')


function start(route, handle){
	function onRequest(req, res){
		var pathname = url.parse(req.url).pathname;

		route(pathname, handle, res, req);
	}
	http.createServer(onRequest).listen('8000')
	console.log("Server started...")
}

exports.start = start;