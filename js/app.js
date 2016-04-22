!function(){
	var pages = {
		loading : $("#loading"),
		index : $("#index"),
		room : $("#room"),
		netRoom : $("#netRoom"),
		dialog : $("#dialog"),
		single : $("#btn-single"),
		double : $('#btn-double'),
		online : $('#btn-online'),
	};
	
	var ua = window.navigator.userAgent.toLowerCase();
	var isAndroid = /android/i.test(ua);
	var isIOS = /iphone|ipad|ipod/i.test(ua);
	// console.log(ua)
	// console.log(isAndroid)
	// console.log(isIOS)
	var app = {
		init : function(){
			this.initEvent();
			this.loading();
		},
		loading : function(){
			// 做图片预加载

		},
		render : function(){
			setTimeout(function(){
				pages.loading.hide();
				pages.room.show();
			},1000);
		},
		initEvent : function(){
			var clickEvent = "ontouchstart" in document.documentElement ? "touchstart" : "click";
			var myApp = this;
			console.log(clickEvent)
			pages.single.on(clickEvent, function() {
				
				console.log("msg")
				var options = {
					room : document.querySelector('#room'),
					box : room.querySelector('#chess'),
					start : room.querySelector('#btn-start'),
					exit : room.querySelector('#btn-exit'),
				}

				pages.index.hide();
				pages.room.show();
				var game = new Game(options);
				options.exit.addEventListener('click', function(){
					pages.room.hide();
					game = null;
					pages.index.show();
				})
				// var type = $(myApp).data('type') || 'color';
				//pages.loading.show();
				//myApp.render();
				// Game.init(type, pages.room, myApp);
			});
			pages.double.on(clickEvent, function() {
				
				var options = {
					room : document.querySelector('#room'),
					box : room.querySelector('#chess'),
					start : room.querySelector('#btn-start'),
					exit : room.querySelector('#btn-exit'),
					rows : 10
				}

				pages.index.hide();
				pages.room.show();
				var game = new Game(options);
				options.exit.addEventListener('click', function(){
					pages.room.hide();
					game = null;
					pages.index.show();
				})
			})
			pages.online.on(clickEvent, function() {
				var options = {
					room : document.querySelector('#netRoom'),
					box : room.querySelector('#chess'),
					start : room.querySelector('#btn-start'),
					exit : room.querySelector('#btn-exit'),
					rows : 10
				}
				pages.index.hide();
				pages.netRoom.show();
				var game = new NetGameProxy(options);
				options.exit.addEventListener('click', function(){
					pages.room.hide();
					game = null;
					pages.index.show();
				})
			})
		}
	}
	app.init();
	window.API = {};

}();