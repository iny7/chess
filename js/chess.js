;(function(){

	function Game(options){
		this.options = options;
		this.init();
	}
	Game.prototype.init = function(){
		this.initProperty();
		this.initEvent();
	}
	Game.prototype.initProperty = function(){

		this.box = this.options.box;
		this.box.style.width = '80%';
		var width = this.box.getBoundingClientRect().width;
		console.log(width)
		
		var rows = this.options.rows;
		var per = width / rows;
		var start = width / rows / 2;
		var end = width - start;

		this.width = width;
		this.rows = rows;
		this.per = per;
		this.start = start;
		this.end = end;
		
		this.ctx = this.box.getContext('2d');
	}
	Game.prototype.drawChessBoard = function(width, height){
		
		for(var i = 0 ; i < this.rows ; i ++){
			this.arr[i] = [];
		}
		var width = this.width
		var ctx = this.ctx;
		var per = this.per;
		var start = this.start
		var end = this.end;

		console.log(this.rows)
		
		//这两句是改canvas标签的属性
		this.box.width = width;
		this.box.height = width;
		
		ctx.fillStyle = '#D9B35F';
		ctx.fillRect(0, 0, width, width)
		ctx.strokeStyle = "#666"

		ctx.lineWidth = 2;
		for(var i = 0 ; i < this.rows ; i ++){
			ctx.moveTo(start, start + per * i)
			ctx.lineTo(end, start + per * i)
			ctx.moveTo(start + per * i, start)
			ctx.lineTo(start + per * i, end)
		}
		ctx.stroke();
	}

	Game.prototype.drawChessman = function(i, j, isBlack){
		
		console.log("mine: ")
		this.mine.forEach(function(me){
			console.log(me)
		});

		console.log("enemys: ")
		this.enemys.forEach(function(me){
			console.log(me)
		});

		var ctx = this.ctx;
		var r = this.per*0.4;

		var x = this.start + this.per * j;
		var y = this.start + this.per * i;
		var gradient = ctx.createRadialGradient(x, y,15,x-6,y-6,1);
		if(isBlack){
			gradient.addColorStop(0, "#0a0a0a")
			gradient.addColorStop(1, "#636766")
			
		}else{
			gradient.addColorStop(0, "#CCC")
			gradient.addColorStop(1, "#FFF")
		}
		ctx.fillStyle = gradient
		ctx.beginPath();
		ctx.arc(x, y, r, 0, 2*Math.PI);
		ctx.fill()
	}
	Game.prototype.initEvent = function(){
		var _this = this;
		var startBtn = this.options.start;
		var exitBtn = this.options.exit;
		var per = this.per;
		
		this.box.addEventListener('click', function(event){
			var i = Math.floor(event.layerY/per);
			var j = Math.floor(event.layerX/per);
			_this.step(i, j);
		})

		startBtn.addEventListener('click', function(){
			console.log("asd")
			_this.newGame();
		})
		exitBtn.addEventListener('click', function(){
			_this.exit();
		})
	}
	Game.prototype.step = function(i, j){

		var isMe = this.isMe;
		var arr = this.arr;
		
		if(arr[i][j] === undefined){
			var node = {
				i : i,
				j : j
			}
			if(this.isMe){
				console.log("自己")
				this.mine.push(node)
				this.arr[i][j] = 1;
			}else{
				console.log("敌人")
				this.enemys.push(node)
				this.arr[i][j] = 2;
			}

			if(this.isBlack === undefined){
				console.log("单机模式")
				this.drawChessman(i, j, isMe)
			}else{
				console.log("网络模式")
				if(this.isBlack === true){
					this.drawChessman(i, j, true)
				}else{
					this.drawChessman(i, j)
				}	
			}
			
			this.isMe = !this.isMe;
			return true;
		}else{
			console.log("已经有子了")
			return false;
		}
	}
	Game.prototype.newGame = function(){
		this.arr = [];
		this.mine = [];
		this.enemys = [];
		this.isMe = true;
		this.drawChessBoard();
	}
	Game.prototype.exit = function(){
		console.log("退出")
	}
	window.Game = Game;	
})()