;(function(){
	// Game的网络代理
	function NetGameProxy(options){
		this.options = options;
		this.init();
	}
	//继承
	var obj = function(){};
	obj.prototype = Game.prototype;
	NetGameProxy.prototype = new obj();
	NetGameProxy.prototype.constructor = NetGameProxy;
	NetGameProxy.uber = Game.prototype;

	NetGameProxy.prototype.step = function(i, j){
		console.log('是否轮到我下:',this.isMe)

		if(this.isMe){
			var canStep = NetGameProxy.uber.step.call(this, i, j);
			if(canStep){
				var node = {
					i : i,
					j : j
				}
				this.socket.emit('move',node)	
			}
			
		}
	}
	NetGameProxy.prototype.newGame = function(){
		NetGameProxy.uber.newGame.call(this)
		this.socket = io('http://127.0.0.1:8000');
		this.netEvent();
		var code = $('#code').val();
		this.socket.emit('newgame',code)
	}
	NetGameProxy.prototype.exit = function(){
		this.socket.disconnect();
	}
	NetGameProxy.prototype.netEvent = function(){
		var _this = this;
		this.socket.on('start', function(isBlack) {
			_this.isBlack = isBlack;
			_this.isMe = isBlack;
			if(isBlack){
				console.log("我执黑先行")
			}else{
				console.log("对手执黑先行")
			}
		});
		this.socket.on('move', function(node) {
			console.log("对手落子",node)
			var isFirst = _this.isFirst;
			var i = node.i;
			var j = node.j
			_this.arr[i][j] = 2;
			_this.enemys.push(node)
			_this.drawChessman(node.i, node.j, !_this.isBlack)
			_this.isMe = true;
		});
		this.socket.on('retract', function(event) {
			console.log('对方请求悔棋');
		});
		this.socket.on('giveup', function(event) {
			console.log('对方认输');
		});
		this.socket.on('disconnect', function(event) {
			console.log('对方退出了游戏');
		});

	}
	window.NetGameProxy = NetGameProxy;
})()

;(function(){
	// Game的人机代理
	function AIGameProxy(options, socket){
		this.options = options;
		this.socket = socket;
	}
	//继承
	var obj = function(){};
	obj.prototype = Game.prototype;
	AIGameProxy.prototype = new obj();
	AIGameProxy.prototype.constructor = AIGameProxy;
	AIGameProxy.uber = Game.prototype;

	AIGameProxy.prototype.drawChessman = function(i, j){
		var node = {
			x : i,
			y : j
		}
		console.log(this.isMe)
		if(this.isMe){
			// this.socket.emit('move',node)
		}
		AIGameProxy.uber.drawChessman.call(this, i, j)
	}

	window.AIGameProxy = AIGameProxy;
})()