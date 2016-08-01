var screenWidth, screenHeight, planetRadiu, screenCenterX, screenCenterY, currentX, currentY, spaceship_count, spaceship_size, spaceship_speed, default_charge_rate, default_discharge_rate, failture_rate, oImg, powerBar_pos_offset;

screenWidth = 800;						//画布宽度
screenHeight = 800;						//画布高度
planetRadiu = 50;						//圆半径
screenCenterX = 800 / 2;				//中心x
screenCenterY = 800 / 2;				//中心y
currentX = screenCenterX - 50;			//350
currentY = screenCenterY - 50;			//350
spaceship_count = 4;					//飞机数量
spaceship_size = 40;					//飞机大小	
spaceship_speed = 2;					//飞行速度
default_charge_rate = 0.3;				//充电速度
default_discharge_rate = 0.2;			//放电速度
failture_rate = 0.3;					//消息发送失败率
powerBar_pos_offset = 5;				//电量条偏移位置

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;



var Spaceship = function( id ){
	this.id = id;				//飞机id
	this.power = 100;			//初始电量
	this.currentState = 'stop'; //初始状态
	this.mediator = null;		//初始化时未安装喇叭
	this.orbit = 100 + 50 * id - spaceship_size / 2;	//飞机所在轨道的半径
	this.deg = 0;				//飞机初始角度
	this.timer = null;
};

/**
 * [dynamicManager 飞船动力系统]
 * @return {[obj]} [obj = { fly, stop }]
 */
Spaceship.prototype.dynamicManager = function(){

	var self = this;
	var fly = function(){
		self.timer = setInterval( function(){
			self.deg += spaceship;
			if( self.deg >= 360 ) self.deg = 0;
		}, 20 );
		ConsoleMs.show( 'Spaceship No.' + self.id + ' is flying.');
	};

	var stop = function(){
		clearInterval( self.timer );
		ConsoleMs.show( 'Spaceship No.' + self.id + ' is stop.' );
	};

	return {
		fly: fly,
		stop: stop
	};

};

Spaceship.prototype.powerManager = function(){
	var self  = this;

	var charge = function(){
		var chargeRate = default_charge_rate;
		var timer = setInterval( function(){
			if( self.currentState === 'fly' || self.currentState === 'destory' ){
				clearInterval( timer );
				return false;
			}
			if( self.power >= 100 ){
				clearInterval( timer );
				self.power = 100;
				return false;
			}
			self.power += chargeRate;
			return true;
		}, 20 );
		ConsoleMs.show( 'Spaceship No.' + self.id + ' is charging.' );
	};

	var discharge = function(){
		var dischargeRate = default_discharge_rate;
		var timer = setInterval( function(){
			if( self.currentState === 'stop' || self.currentState === 'destory' ){
				clearInterval( timer );
				return false;
			}
			if( self.power <= 0 ){
				clearInterval( timer );
				self.power = 0;
				self.stateManager.changeState( 'stop' );
				return false;
			}
			self.power -= dischargeRate;
		}, 20 );
		ConsoleMs.show( 'Spaceship No.' + self.id + ' is discharging.' );
	};

	return {
		charge: charge,
		discharge :discharge
	};

};

/**
 * [stateManager 状态管理]
 * @return {[obj]} [obj = { changeState: changeState]
 */
Spaceship.prototype.stateManager = function(){

	var self, states, changeState;
	self = this;
	states = {
		fly: function( state ){
			self.currentState = 'fly';					//改变当前状态
			self.dynamicManager().fly();				//控制飞船的飞行
			self.powerManager().discharge();			//飞船放电
		},
		stop: function( state ){
			self.currentState = 'stop';
			self.dynamicManager().stop();
			self.powerManager().charge();
		},
		destroy: function( state ){
			self.currentState = 'destroy';
			self.mdiator.remove( self );				//销毁飞船
		}
	};

	changeState = function( state ){

		states[ state ] && states[ state ]();
		ConsoleMs.show( 'Spaceship NO.' + self.id + ' state is ' + state );

	};

	return {
		changeState: changeState
	};

};

/**
 * [signalManage 信号系统]
 * @return {[obj]} [obj = { receive: function(){} }]
 */
Spaceship.prototype.signalManage = function(){
	var self = this;					//sapceship的实例
	return {
		receive: function( msg ){
			if( self.currentState !== msg.cmd && self.id === msg.id ){
				self.stateManager().changeState( msg.cmd );
			}
		}
	};
};


/**
 * [Commander 指挥官]
 * 单向传输指令，只负责发出指令
 */
var Commander = function(){
	this.id = 'Don';					
	this.cmds = [];						//命令集
	this.mediator = null;				//中间信息载体(喇叭)，为obj对象
};

/**
 * [send 命令下达]
 * @param  {[obj]} msg [obj.id为对应按钮的index值，obj.cmd为下达的命令]
 */
Commander.prototype.send = function( msg ){
	this.mediator.send( msg );
	this.cmds.push( msg );
};

/**
 * [Mediator 中间消息载体(喇叭)]
 * @return {[obj]}         [喇叭绑定的功能---注册、发送、创建]
 */
var Mediator = function(){
	this.spaceships = [];				//用于存放飞船实例
	this.commander = null;				//指挥官实例
	return {
		// 对象必须先注册才能进行通讯
		registor: function( obj ){
			if( obj instanceof Commander ){
				commander = obj;
				obj.mediator = this;
				ConsoleMs.show( 'mediator registor' + 'commander ' + obj.id );
				return true;
			} else if( obj instanceof Spaceship ){
				spaceships[ obj.id ] = obj;
				obj.mediator = this;
				ConsoleMs.show( 'mediator registor spaceship' + obj.id );
				return true;
			}
			ConsoleMs.show( 'mediator registor failed' );
			return false;
		},

		send: function( msg ){				//obj = { id, cmd };
			var self, success;
			self = this;
			setTimeout( function(){
				success = Math.random() > failture_rate ? true : false;
				if ( !success ){
					ConsoleMs.show( 'send failed' );
					return false;
				}
				if ( msg.cmd === 'launch' ){			
					self.create( msg );
				}
				ConsoleMs.show ( 'send success' );
				return true;
			}, 1000 );
		},

		create: function( msg ){

			var spaceship;

			if ( spaceships [ msg.id ] !== undefined ){
				ConsoleMs.show( 'Spaceship already exists' );
				return false;
			}

			spaceship = new Spaceship( msg.id );		//新建飞机实例
			this.registor( spaceship );					//给飞机装个喇叭
			return true;

		},

		getSpaceships: function(){
			return sapceships;
		}

	};

};


/**
 * [Message 消息载体，只负责将信息转换成以实例输出]
 * @param {[num]} target  [对应的index值]
 * @param {[str]} command [命令信息]
 */
var Message = function( target, command){
	this.id = target;
	this.cmd = command;
};

var btnListener = function(){
	var id, cmd;
	id = null;
	cdm = null;
	$('.btns').on('click', function(){
		var cmdName = $(this).parent().attr('name');
		id = $(this).parent().index();
		cmd = cmdName;
	});
	var message = new Message( id, cdm );
	commander.send( message );
	return true;
};


/**
 * [description]
 * @param  {[obj]} 	msg	   [msg = { id, cmd }]
 * @return {[obj]}         [返回添加显示信息的方法]
 */
var ConsoleMs = (function(){
	var consoleLog = $('.console ul');
	var show = function( msg ){
		var oLi = $('<li/>');
		oLi.text( msg );
		consoleLog.prepend( oLi );
	};
	return {
		show: show
	};
})();

var AnimUtil = ( function(){
	var canva, ctx, cacheCanva, cacheCtx, mediator;
	mediator = null;
	// 接受填充的画布（真实渲染用的画布）
	canva = document.querySelector( '#screen' );
	canva.width = screenWidth;
	canva.height = screenHeight;
	ctx = canva.getContext( '2d' );

	// 缓存画布（暂存）
	cacheCanva = document.createElement( 'canva' );
	cacheCanva.width = screenWidth;
	cacheCanva.height = screenHeight;
	cacheCtx = cacheCanva.getContext( '2d' );

	/**
	 * [drawPlanet 画行星]
	 * @param  {[obj]} ctx [canvas目标画布]
	 */
	var drawPlanet = function ( ctx ){

		oImg = new Image();

		oImg.onload = function (){

			ctx.drawImage( oImg, currentX, currentY, planetRadiu * 2, planetRadiu * 2 );
		};

		oImg.src = 'img/oreo.png';

	};

	/**
	 * [drawOrbit 画飞船轨道]
	 * @param  {[obj]} ctx [canvas目标画布]
	 */
	var drawOrbit = function ( ctx ){

		for (var i = 0; i < planteCount; i++) {
			
			ctx.strokeStyle = '#999';
			ctx.beginPath();
			ctx.arc( screenCenterX, screenCenterY, 100 + 50 * i, 0, 2 * Math.PI );
			ctx.closePath();
			ctx.stroke();

		}

	};

	var onDraw = function( spaceships ){
		if( !( spaceship === undefined || spaceship.every( function( item ){
			return item === undefined;
		} ) ) ){
			cacheCtx.clearRect( 0, 0, screenWidth, screenHeight );
			for (var i = 0; i < spaceships.length; i++) {
				if( spaceships[i] !== undefined ){
					drawSpaceship( cacheCtx, spaceship[i] );
				}
			}
		} else{
			cacheCtx.clearRect( 0, 0, screenWidth, screenHeight );
		}
	};

	var animLoop = function(){
		onDraw( mediator.getSpaceships );
		requestAnimationFrame( animLoop );
	};

	/**
	 * [drawSpaceship description]
	 * @param  {[obj]} _ctx       [cacheCxt缓存画布对象]
	 * @param  {[obj]} spaecship [飞船对象]
	 * @return {[boolean]}           [绘画成功返回true，反之false]
	 */
	var drawSpaceship = function( _ctx, spaecship ){
		var oImg = new Image();
		oImg.onload = function(){
			_ctx.save();
			_ctx.translate( screenCenterX, screenCenterY );
			_ctx.rotate( -spaceship.deg * Math.PI / 180 );
			/*画电量条*/
			if( spaceship.power >= 60 ){
				_ctx.strokeStyle = '#7DE8B7';
			} else if( spaceship.power < 60 && spaceship.power >= 20 ){
				_ctx.strokeStyle = '#FFB22E';
			} else{
				_ctx.strokestyle = '#FF3900';
			}
			_ctx.lineWidth = 5;
			_ctx.beginPath();
			_ctx.moveTo( sapceship.orbit, -powerBar_pos_offset );
			_ctx.lineTo( spaceship.orbit + 40 * ( sapceship.power / 100 ), -powerBar_pos_offset );
			_ctx.stroke();

			_ctx.drawImage( oImg, sapceship.orbit, 0, spaceship_size, spaceship_size );
			_ctx.restore();

			ctx.clearRect( 0, 0, screenWidth, screenHeight );
			ctx.drawImage( cacheCanva, 0, 0, screenWidth, screenHeight );

		};
		oImg.src = '../img/min-iconfont-rocket-active.png';
	};

	var setMediator = function( _mediator ){
		mediator = _mediator;
	};

	try{

		(function(){

			var oPlant, ctx;

			oPlant = document.querySelector('.plant');
			oPlant.width = screenWidth;
			oPlant.height = screenHeight;
			ctx = oPlant.getContext( '2d' );

			ctx.clearRect( 0, 0, screenWidth, screenHeight );

			drawPlanet( ctx );

			drawOrbit( ctx );
			
		})();

	} catch( e ){

		throw new Error( '您的浏览器不支持Canvas！' );

	}

	return {
		setMediator: setMediator,
		animLoop: animLoop
	};
	
})();

window.onload = function(){

	var commander, mediator;
	commander = new Commander();			//指挥官实例
	mediator = new Mediator();				//消息载体(喇叭)
	mediator.registor( commander );			//给指挥官装个喇叭
	btnListener( commander );				//监听按钮事件
	AnimUtil.setMediator( mediator );
	AnimUtil.animLoop();
};
