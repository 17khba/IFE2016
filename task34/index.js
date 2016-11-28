(function(){

	var W, H, str, oTxt, oBtn, wrap, controller, handler;

	W = 41;
	H = 41;
	oTxt = document.querySelector('.inp-txt');
	oBtn = document.querySelector('.btn');
	wrap = document.querySelector('.wrap');

	controller = (function(){

		// 创建容器
		function mkZone(ele, config) {

			var x, y, i, j, box;
			x = config.x;
			y = config.y;
			box = document.createDocumentFragment();

			for (i = 0; i < x; i++) {
				for (j = 0; j < y; j++) {
					box.appendChild(_createDiv({
						ox: i,
						oy: j,
						x: x,
						y: y
					}));
				}
			}

			wrap.style.width = config.x * W - 1 + 'px';
			wrap.appendChild(box);

			return _mkCurrent(ele, config);
		}

		// 创建div小块
		function _createDiv(config) {

			var oDiv;
			oDiv = document.createElement('div');
			oDiv.className = 'box';

			if(config.ox === config.x - 1){
				oDiv.className += ' non-bot';
			}

			if(config.oy === config.y - 1){
				oDiv.className += ' non-rig';
			}

			return oDiv;

		}

	  // 返回保存当前元素状态的对象
		function _mkCurrent(ele, config) {

			var ox, oy, action;
			ox = Math.floor(Math.random() * 10);
			oy = Math.floor(Math.random() * 10);
			action = _createEle({
				x: ox,
				y: oy
			});

			ele.appendChild(action);

			// turn记录方向，rotate记录角度；
			return {
				current: action,
				ox: ox,
				oy: oy,
				x: config.x,
				y: config.y,
				turn: 0,
				rotate: 0
			};

		}

		// 创建当前元素
		function _createEle(config) {
			var current;
			current = document.createElement('div');
			current.className = 'active';
			current.style.top = config.y * H + 'px';
			current.style.left = config.x * W + 'px';

			return current;

		}

		return (function(){

			var pos = mkZone(wrap, {
				x: 10,
				y: 10
			});

			// 操作方向
			function turn(direction, deg){

				if(deg === undefined){

					if(direction === 1){
						pos.rotate += 90;
						if(pos.rotate >= 360) pos.rotate = 0;
					}

					if(direction === 2){
						pos.rotate += 180;
						if(pos.rotate >= 360) pos.rotate %= 360;
					}

					if(direction === 3){
						pos.rotate -= 90;
						if(pos.rotate <= -360) pos.rotate = 0;
					}

				} else{

					pos.rotate = deg;

				}

				if(pos.rotate >= 0){
					pos.turn = pos.rotate / 90;
				} else{
					pos.turn = pos.rotate / 90 + 4;
				}

				pos.current.style.transform = 'rotate(' + pos.rotate + 'deg)';

			}

			// 只负责操作位置
			function move(direction) {

				var order = direction || pos.turn;

				if(order === 0 && pos.oy > 0) pos.oy--;

				if(order === 1 && pos.ox < pos.x - 1) pos.ox++;

				if(order === 2 && pos.oy < pos.y - 1) pos.oy++;

				if(order === 3 && pos.ox > 0) pos.ox--;

				pos.current.style.top = pos.oy * H + 'px';
				pos.current.style.left = pos.ox * W + 'px';

			}

			return {
				turn: turn,
				move: move
			};

		})();

	})();

	handler = {
		'GO': function(){
			controller.move();
		},
		'TUN LEF': function(){
			controller.turn(3);
		},
		'TUN RIG': function(){
			controller.turn(1);
		},
		'TUN BOT': function(){
			controller.turn(2);
		},
		'TRA TOP': function(){
			controller.move(0);
		},
		'TRA RIG': function(){
			controller.move(1);
		},
		'TRA BOT': function(){
			controller.move(2);
		},
		'TRA LEF': function(){
			controller.move(3);
		},
		'MOV TOP': function(){
			controller.turn(null, 0);
			controller.move();
		},
		'MOV RIG': function(){
			controller.turn(null, 90);
			controller.move();
		},
		'MOV BOT': function(){
			controller.turn(null, 180);
			controller.move();
		},
		'MOV LEF': function(){
			controller.turn(null, 270);
			controller.move();
		}
	};

	oBtn.addEventListener('click', function(){

		str = oTxt.value.trim().toUpperCase();
		handler[str] && handler[str]();

	}, false);


})();