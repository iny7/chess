window.onload = function(){

	var width = 630;
	var height = 630;
	var box = document.querySelector('#chess');
	box.width = width;
	box.height = height;
	var ctx = box.getContext('2d');
	console.log(ctx)
	var mine = [];
	var enemys = [];
	var arr = [];
	isMe = true;

	ctx.fillStyle = '#D9B35F';
	ctx.fillRect(0, 0, width, height)

	ctx.strokeStyle = "#666"
	for(var i = 0 ; i < 21 ; i ++){

		ctx.moveTo(15, 15 + 30 * i)
		ctx.lineTo(615, 15 + 30 * i)

		ctx.moveTo(15 + 30 * i, 15)
		ctx.lineTo(15 + 30 * i, 615)
	}
	ctx.stroke();
	
	box.addEventListener('click', function(event){
		var x = event.layerX;
		var y = event.layerY;
		var i = Math.floor(y/30);
		var j = Math.floor(x/30);
		
		arr[i] = arr[i] ? arr[i] : [];
		if(arr[i][j] === undefined){
			var node = {
				x : j,
				y : i
			}
			if(isMe){
				console.log("自己")
				mine.push(node)
				arr[i][j] = 1;
				drawOne(ctx, i, j, true)
			}else{
				console.log("敌人")
				arr[i][j] = 2;
				enemys.push(node)
				drawOne(ctx, i, j)
			}
			isMe = !isMe;
		}else{
			console.log("已经有子了")
		}
		
		console.log("mine: ")
		mine.forEach(function(me){
			console.log(me)
		});

		console.log("enemys: ")
		enemys.forEach(function(me){
			console.log(me)
		});
	})
}

function drawOne(ctx, i, j ,isMe){
	var x = 15 + 30 * j;
	var y = 15 + 30 * i;

	var gradient = ctx.createRadialGradient(x, y,15,x-6,y-6,1);
	if(isMe){
		gradient.addColorStop(0, "#0a0a0a")
		gradient.addColorStop(1, "#636766")
		
	}else{
		gradient.addColorStop(0, "#CCC")
		gradient.addColorStop(1, "#FFF")
	}
	ctx.fillStyle = gradient
	ctx.beginPath();
	ctx.arc(x, y, 12, 0, 2*Math.PI);
	ctx.fill()
}

