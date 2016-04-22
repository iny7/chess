var server = require('http').createServer().listen(8000);
var io = require('socket.io').listen(server);

var sockets = [];
io.on('connection', function(socket) {
	socket.on('newgame', function(code) {
		socket.code = code;
		sockets.some(function(item){
			if(item.code == code){
				//先来的先下
				item.emit('start',true)
				socket.emit('start',false)
			}
		})
		sockets.push(socket);
		console.log("当前房间里有",sockets.length,'人');
	});
	socket.on('move', function(node) {
		socket.broadcast.emit('move',node);
	});
	socket.on('retract', function() {
		socket.broadcast.emit('retract','对方请求悔棋');
	});
	socket.on('giveup', function() {
		socket.broadcast.emit('giveup','对方认输');
	});
	socket.on('disconnect', function() {
		socket.broadcast.emit('exit','对方退出了游戏');
		var index = sockets.indexOf(socket);
		sockets.splice(index, 1);
		console.log("当前房间里有",sockets.length,'人');
	});
});