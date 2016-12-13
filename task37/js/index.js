(function (win, doc) {
	
	var btnShow, oDialog, oTit, btnClose, overlay, rigLine, botLine, botArea, _hideDialog, _showDialog, init, Drag;

	btnShow = $('.showLogin');
	oDialog = $('.dialog');
	oTit = $('.dialog-tit');
	btnClose = $('.btn-close');
	overlay = $('.dialog-overlay');
	rigLine = $('.right-line');
	botLine = $('.bot-line');
	botArea = $('.area-btn');

	_hideDialog = function (ev){
		oDialog.className = 'dialog';
	}

	_showDialog = function (){
		oDialog.className = 'dialog active-dialog';
	}

	init = win.onresize = function (){

		addEvent(btnShow, 'click', _showDialog);
		addEvent(overlay, 'click', _hideDialog);
		addEvent(btnClose, 'click', _hideDialog);

	}

	init();

  Drag = function(obj){

  	// 可拖动的区域（标题部分）
  	this.dragArea = obj.oTit;
  	// 可拖动的元素
  	this.current = obj.oDialog;
  	this.rigLine = obj.rigLine;
  	this.botLine = obj.botLine;
  	this.botArea = obj.botArea;
  	// 判断是否处于拖动状态
  	this.isDrag = false;
  	this.isMoving = false;
  	this.direction = '';
  	this.posStartX = 0;
  	this.posStartY = 0;
  	this.disX = 0;
  	this.disY = 0;
  	this.posX = 0;
  	this.posY = 0;
  	this.init();
  }

  Drag.prototype.init = function (){
  	// 水平居中目标元素
  	this.autoCenter();
  	this.dragStart();
  	this.dragMove();
  	this.dragEnd();
  	this.zoom();
  }

  Drag.prototype.autoCenter = function (){

		var docW, docH, current, currentW, currentH;

		docW = doc.body.offsetWidth || doc.documentElement.clientWidth;
		docH = doc.body.offsetHeight || doc.documentElement.clientHeight;
		current = this.current;
		currentW = current.offsetWidth;
		currentH = current.offsetHeight;
		current.style.top = docH / 2 - (currentH / 2) + 'px';
		current.style.left = docW / 2 - (currentW / 2) + 'px';

  }

  Drag.prototype.dragStart = function(){

  	var self = this;

  	addEvent(this.dragArea, 'mousedown', _dragStart);

  	function _dragStart(ev){

  		var e = ev || event;

  		self.isDrag = true;
  		self.disX = e.clientX - this.parentNode.offsetLeft;
  		self.disY = e.clientY - this.parentNode.offsetTop;

  		if(this.setCapture) this.setCapture();

  	}

  }

	Drag.prototype.dragMove = function(){

		var self, isBot;

		self = this;
		isBot = self.direction === 'bot';

		addEvent(doc, 'mousemove', _dragMove);

		function _dragMove(ev){

			var e, current;

			e = ev || event;
			current = self.current;

			self.posX = e.clientX;
			self.posY = e.clientY;

			if (!self.isDrag) return;

			currentX = self.posX - self.disX;
			currentY = self.posY - self.disY;

			// 元素最大可移动距离
			docW = doc.body.offsetWidth || doc.documentElement.clientWidth;
			docH = doc.body.offsetHeight || doc.documentElement.clientHeight;
			maxMoveX = docW - current.offsetWidth;
			maxMoveY = docH - current.offsetHeight;

			currentX = Math.min(maxMoveX, Math.max(0, currentX));
			currentY = Math.min(maxMoveY, Math.max(0, currentY));

			current.style.top = currentY + 'px';
			current.style.left = currentX + 'px';

		}

	};

	Drag.prototype.dragEnd = function(){

		var self = this;

		addEvent(doc, 'mouseup', _dragEnd);

		function _dragEnd(){

			clearInterval(self.timer);
      self.isDrag = false;
      self.isMoving = false;
      removeEvent(doc, 'mousemove', null);
      removeEvent(doc, 'mouseup', null);

      if(this.releaseCapture) {
      	self.current.releaseCapture();
      	self.rigLine.releaseCapture();
      	self.botLine.releaseCapture();
      	self.lefLine.releaseCapture();
      	self.botArea.releaseCapture();
      }

      return false;

		}

  };

  Drag.prototype.zoom = function () {
  	var self;

  	self = this;

  	addEvent(self.rigLine, 'mousedown', pointStart);
  	addEvent(self.botLine, 'mousedown', pointStart);
  	addEvent(self.botArea, 'mousedown', pointStart);

  	function pointStart (ev) {

  		var e;

  		e = ev || event;

  		self.isMoving = true;
  		self.posStartX = e.clientX - this.offsetLeft;
  		self.posStartY = e.clientY - this.offsetTop;

  		if (/right/.test(this.classList[0])) {
  			self.direction = 'rig';
  		} else if (/bot/.test(this.classList[0])) {
  			self.direction = 'bot';
  		} else{
  			self.direction = 'area';
  		}

  		self.timer = setInterval(function () {
  			self.doMove();
  		}, 25);

  		if (this.setCapture) this.setCapture();

  	}

  	Drag.prototype.doMove = function () {

  		var currentW, currentH;

  		currentW = this.posX - this.posStartX;
  		currentH = this.posY - this.posStartY;

  		currentW = Math.max(currentW, 300);
  		currentH = Math.max(currentH, 200);

  		if (this.direction === 'rig') {
  			this.current.style.width = currentW + 'px';
  		} else if (this.direction === 'bot') {
  			this.current.style.height = currentH + 'px';
  		} else {
  			this.current.style.width = currentW + 'px';
  			this.current.style.height = currentH + 'px';
  		}
  	}

  }

  var obj = {
  	oTit: oTit,
  	oDialog: oDialog,
  	rigLine: rigLine,
  	botLine: botLine,
  	botArea: botArea
  }

  var move = new Drag(obj());


})(window, document);

function $(str) {
	return document.querySelector(str);
}

function $$(str) {
	return document.querySelectorAll(str);
}

function addEvent(ele, event, fn) {
	if(ele.addEventListener){
		ele.addEventListener(event, fn, false);
	} else if(ele.attachEvent){
		ele.attachEvent('on' + event, fn);
	} else{
		ele['on' + event] = fn;
	}
}

function removeEvent(ele, event, fn) {
	if(ele.removeEventListener){
		ele.removeEventListener(event, fn, false);
	} else if(ele.detachEvent){
		ele.detachEvent('on' + event, fn);
	} else{
		ele['on' + event] = null;
	}
}
