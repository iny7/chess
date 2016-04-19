var net = require('net');

var server = net.createServer(function(socket){
	
	socket.on('end', function(){
		console.log("connection closed")
	})

	socket.write('Hello! This is server.')
	
})
var clients = [];

server.on('connection', function(socket) {
	console.log("A new client connected")

	clients.push(socket);	
	
	socket.on('data', function(data) {
		
		console.log("get data:" + data)
		//向其他用户广播
		clients.forEach(function(s){
			if(s !== socket){
				s.write(data)
			}
		})
	});
	socket.on('close', function() {
		console.log("A client exit")
		var index = clients.indexOf(socket);
		clients.splice(index, 1);
	});

});
server.on('error', function(err) {
	console.log(err)
});
server.on('close', function() {
	console.log('Server closed')
});
server.listen('8000', function(){
	console.log("Server started");
})
