console.log(window.WebSocket)
var socket = new WebSocket('ws://127.0.0.1:8000')
socket.open = function(){
	console.log("open")
}


// var net = require('net')


// process.stdin.resume();
// process.stdin.setEncoding('utf8');


// var client = net.connect({port : 8000}, function(){
// 	console.log("connected to Server,Please input something");
// 	process.stdin.on('data', function(data) {
// 		client.write(data);
// 		if(data === 'end\n'){
// 			client.end();
// 		}
// 	});
// 	client.write('This is client')
// })

// client.on('data', function(data) {
// 	console.log("get data from server",data.toString())
// });

// client.on('end', function() {
// 	console.log("client exit");
// 	process.exit();
// });
