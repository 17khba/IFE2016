var screenWidth, screenHeight, shipWidth, charge_rate, discharge_rate, planetRadiu, powerBar_pos_offset, powerBar_width, powerBar_good, powerBar_medium, powerBar_bad;

screenWidth = 800;					//画布宽高
screenHeight = 800;
screenCenterX = 400;				//画布中心位置
shipWidth = 40;						//飞船宽
shipSpeed = 2;						//飞船飞行速度
charge_rate = 0.3;					//充电速度
discharge_rate = 0.2;				//掉电速度

planetRadiu = 50;					//星球半径

powerBar_pos_offset = 5;			//电量条便宜位置
powerBar_width = 5;					//电量条宽度
powerBar_good = '#7DE8B7';			//电量充足时的颜色
powerBar_medium = '#FFB22E';		//电量一般时的颜色
powerBar_bad = '#FF3900';			//电量不足时的颜色


window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;


var Spaceship = function( id ){
	this.id = id;
	this.curStatus = 'stop';						//飞船初始状态
	this.power = 100;								//飞船初始能量值
	this.deg = 0;									//飞船初始角度为0
	this.orbit = 100 + 50 * id - shipWidth / 2;		//飞船所在轨道半径
	this.mediator = null;							//初始化时未安装喇叭
};

/**
 * [angleManager 控制飞船角度状态的改变]
 * @return {[type]} [description]
 */
Spaceship.prototype.angleManager = function(){
	var self = this;

	var fly = function(){
		self.timer = setInterval( function(){
			self.deg += shipSpeed;
			if( self.deg >= 360 ) self.deg = 0;
		}, 16 );
		ConsoleMs.show( 'Spaceship No.' + self.id + ' is flying.' );
	};

	var stop = function(){
		clearInterval( self.timer );
		ConsoleMs.show( 'Spaceship No.' + self.id + ' has stop.' );
	};

	return {
		fly: fly,
		stop: stop
	};

};

/**
 * [powerManager 控制电量条状态的改变]
 * @return {[type]} [description]
 */
Spaceship.prototype.powerManager = function(){

	var self = this;

	//充电
	var charge = function(){
		var timer = setInterval( function(){
			if( self.curStatus === 'fly' || self.curStatus === 'destory' ){
				clearInterval( timer );
				return false;
			}
			if( self.power >= 100 ){
				clearInterval( timer );
				self.power = 100;
				return false;
			}
			self.power += charge_rate;
		}, 16 );
		ConsoleMs.show( 'Spaceship No.' + self.id + ' is charging.' );
	};

	//掉电
	var discharge = function(){
		var timer = setInterval( function(){
			if( self.curStatus === 'stop' || self.curStatus === 'destory' ){
				clearInterval( timer );
				return false;
			}
			if( self.power <= 0 ){
				clearInterval( timer );
				self.power = 0;
				self.statusSys().changeState( 'stop' );
				return false;
			}
			self.power -= discharge_rate;
		}, 16 );
		ConsoleMs.show( 'Spaceship No.' + self.id + ' is dischargin.' );
	};

	return {
		charge: charge,
		discharge: discharge
	};

};

/**
 * [statusSys 飞船状态管理]
 * @return {[obj]} [扔出一个可以控制状态的对象]
 */
Spaceship.prototype.statusSys = function(){
	var self = this;

	var status = {
		fly: function( cmd ){
			self.curStatus = cmd;
			self.angleManager().fly();
			self.powerManager().discharge();
		},
		stop: function( cmd ){
			self.curStatus = cmd;
			self.angleManager().stop();
			self.powerManager().charge();
		},
		destory: function( cmd ){
			self.curStatus = cmd;
			self.mediator.remove( self );
		}
	};

	var changeState = function( cmd ){
		status[ cmd ] && status[ cmd ]( cmd );
		ConsoleMs.show( 'Spaceship No.' + self.id + ' status is ' + cmd );
	};

	return {
		changeState: changeState
	};

};

/**
 * [singelSys 飞船信息系统]
 * @param  {[obj]} msg [对应的属性为id和cmd]
 * @return {[type]}     [description]
 */
Spaceship.prototype.singelSys = function( msg ){
	var self = this;
	return {
		receive: function( msg ){
			//处于循环中，得判断用户点击的对象
			if( self.curStatus !== msg.cmd && self.id === msg.id ){
				self.statusSys().changeState( msg.cmd );
			}
		}
	};
};

/**
 * [Commander 指挥官，负责单向指令传输，不接收信息]
 */
var Commander = function(){
	this.id = 'Don';
	this.mediator = null;					//指挥官的喇叭，初始化时未安装
};

/**
 * [send 指挥官发出的指令]
 * @param  {[obj]} msg [对应的属性为id和cmd]
 */
Commander.prototype.send = function( msg ){
	this.mediator.send( msg );				//指挥官用自己的喇叭对象发出指令
};

/**
 * [Mediator 喇叭，用于数据传输]
 */
var Mediator = function(){
	var spaceships = [];					//私有属性，保存spaceship实例对象
	var commander = null;					//喇叭的所属者

	return {

		/**
		 * [registor 指挥官、飞船必须注册才能进行通讯]
		 * @param  {[obj]} obj [注册的对象]
		 * @return {[boolean]}     [注册成功返回true，反之false]
		 */
		registor: function( obj ){
			if( obj instanceof Commander ){
				commander = obj;			//指定喇叭的所属者
				obj.mediator = this;		//给指挥官安装喇叭
				ConsoleMs.show( 'Commander installed speaker！');
				return true;
			} else if( obj instanceof Spaceship ){
				spaceships[ obj.id ] = obj;
				obj.mediator = this;
				ConsoleMs.show( 'Spaceship installed speaker！' );
				return true;
			}
			ConsoleMs.show( 'registor failed！' );
			return false;
		},

		/**
		 * [send 消息的发出]
		 * @param  {[obj]} msg [消息对象，包含id和cmd两个属性]
		 */
		send: function( msg ){
			var self ,success;
			self = this;
			success = Math.random() > 0.3 ? true : false;
			if( success ){
				setTimeout( function(){
					if( msg.cmd === 'launch' ){
						self.create( msg.id );
					}
					// 循环操作存储飞船实例的数组，发送消息
					for( var key in spaceships ){
						if( spaceships[ key ] !== undefined ){
							spaceships[ key ].singelSys().receive( msg );
						}
					}
				}, 1000 );
				ConsoleMs.show( 'Message send success.' );
			} else{
				ConsoleMs.show( 'Message send failed.' );
			}
		},

		/**
		 * [create 飞船的创建及喇叭的安装]
		 * @param  {[num]} id [飞船对应id号]
		 */
		create: function( id ){
			var spaceship = new Spaceship( id );
			this.registor( spaceship );			//给飞船安装喇叭
		},

		/**
		 * [remove 移除通讯对象]
		 * @param  {[obj]} obj [飞船对象实例]
		 */
		remove: function( obj ){
			if( obj instanceof Spaceship ){
				ConsoleMs.show( 'Destory spaceship success.' );
				delete spaceships[ obj.id ];
				return false;
			}
			ConsoleMs.show( 'Destory spaceship success.' );
		},

		/**
		 * [getSpaceships 获取飞船队列]
		 * @return {[arr]} [飞船队列]
		 */
		getSpaceships: function(){
			return spaceships;
		}
	};
};

/**
 * [Message 消息载体，将数据转换成对象]
 * @param {[num]} num [对应spaceship的num值]
 * @param {[type]} str [操作名称]
 */
var Message = function( num, str ){
	this.id = num;
	this.cmd = str;
};

/**
 * [btnListener 按钮操作监听]
 * @param  {[obj]} commander [指挥官，用于发送消息的对象]
 */
var btnListener = function( commander ){
	var id, cmd, message;
	$('.control button').on('click', function(){
		id = $(this).parent().index();
		cmd = $(this).text();
		message = new Message( id, cmd );
		commander.send( message );				//指挥官发送指令
	});
};

/**
 * [动画工具---渲染动画，用缓存画布内容代替真实画布内容]
 */
var AnimTool = ( function(){
	var canBg, ctx, canPlanet, cacheCtx, mediator;
	//真实画布
	canBg = document.querySelector( '.planet' );
	canBg.width = screenWidth;
	canBg.height = screenHeight;
	ctx = canBg.getContext( '2d' );

	//缓存画布
	canPlanet = document.createElement( 'canvas' );
	canPlanet.width = screenWidth;
	canPlanet.height = screenHeight;
	cacheCtx = canPlanet.getContext( '2d' );

	mediator = null;						//传输介质，用于获取spaceships数组的值

	/**
	 * [drawPlanet 画行星]
	 * @param  {[obj]} _ctx [canvas对象]
	 */
	var drawPlanet = function( _ctx ){

		var x, oImg;
		x = screenCenterX - planetRadiu;			//350,绘制起点
		oImg = new Image();
		oImg.onload = function(){
			_ctx.drawImage( oImg, x, x, planetRadiu * 2, planetRadiu * 2 );
		};
		oImg.src = './img/oreo.png';

	};

	/**
	 * [drawOrbit 画行星轨道]
	 * @param  {[obj]} _ctx [canvas对象]
	 */
	var drawOrbit = function( _ctx ){
		for (var i = 0; i < 4; i++) {
			_ctx.strokeStyle = '#999';
			_ctx.beginPath();
			_ctx.arc( screenCenterX, screenCenterX, 100 + 50 * i, 0, 2 * Math.PI, false );
			_ctx.closePath();
			_ctx.stroke();
		}
	};

	/**
	 * [初始化时渲染bg，渲染动画时则不再重复操作]
	 */
	(function(){
		var canva, ctx;
		canva = document.querySelector( '.screen' );
		canva.width = screenWidth;
		canva.height = screenHeight;
		ctx = canva.getContext( '2d' );

		drawPlanet( ctx );
		drawOrbit( ctx );
	})();

	/**
	 * [drawSpaceship 画飞船]
	 * @param  {[obj]} _ctx      [缓存画布对象]
	 * @param  {[obj]} spaceship [飞船对象]
	 */
	var drawSpaceship = function( _ctx, spaceship ){
		var oImg = new Image();
		oImg.onload = function(){
			try{
				// 绘制电量条
				_ctx.save();
				_ctx.translate( screenCenterX, screenCenterX );
				_ctx.rotate( -spaceship.deg * Math.PI / 180 );

				_ctx.beginPath();

				if( spaceship.power > 60 ){
					_ctx.strokeStyle = powerBar_good;
				} else if( spaceship.power <= 60 && spaceship.power > 20 ){
					_ctx.strokeStyle = powerBar_medium;
				} else{
					_ctx.strokeStyle = powerBar_bad;
				}

				_ctx.lineWidth = powerBar_width;
				_ctx.moveTo( spaceship.orbit, -powerBar_pos_offset);
				_ctx.lineTo( spaceship.orbit + shipWidth * ( spaceship.power / 100 ), -powerBar_pos_offset );
				_ctx.stroke();

				// 绘制飞船
				_ctx.drawImage( oImg, spaceship.orbit, 0, shipWidth, shipWidth );
				_ctx.restore();

				ctx.clearRect( 0, 0, screenWidth, screenHeight );
				ctx.drawImage( canPlanet, 0, 0, screenWidth, screenHeight );
				return true;
			} catch ( error ){
				alert( error.message );
			}

		};
		oImg.src = './img/min-iconfont-rocket-active.png';
	};

	/**
	 * [onDraw 绘制屏幕画布]
	 * @param  {[arr]} spaceships [飞船队列]
	 */
	var onDraw = function( spaceships ){
		if( !( spaceships === undefined || spaceships.every( function( item ){
			return item === undefined;
		} ) ) ){
			cacheCtx.clearRect( 0, 0, screenWidth, screenHeight );
			for (var i = 0; i < spaceships.length; i++) {
				if( spaceships[i] !== undefined ){
					drawSpaceship( cacheCtx, spaceships[i] );
				}
			}
		} else{
			ctx.clearRect( 0, 0, screenWidth, screenHeight );
		}
	};

	/**
	 * [animLoop 动画循环]
	 */
	var animLoop = function(){
		onDraw( mediator.getSpaceships() );
		requestAnimationFrame( animLoop );
	};

	/**
	 * [setMediator 安装喇叭，用于获取spaceships数组数据渲染动画]
	 */
	var setMediator = function( _mediator ){
		mediator = _mediator;
	};

	return {
		setMediator: setMediator,
		animLoop: animLoop
	};

} )();

/**
 * [操作日志输出至控制台]
 * @return {[obj]}         [抛出show方法]
 */
var ConsoleMs = ( function(){

	var oUl = $('.console ul');
	var show = function( msg ){
		var oLi = $('<li/>');
		oLi.text( msg );
		oUl.prepend( oLi );
	};

	return {
		show: show
	};

} )();

window.onload = function(){
	var commander, mediator;
	commander = new Commander();			//指挥官实例
	mediator = new Mediator();				//喇叭实例
	mediator.registor( commander );			//给指挥官安装喇叭
	btnListener( commander );				//按钮监听
	AnimTool.setMediator( mediator );		//给工具安装喇叭，用于获取spaceships数组数据渲染动画
	AnimTool.animLoop();					//动画循环
	console.log($(document).height());
};

