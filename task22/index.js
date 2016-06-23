(function(){
	var treeMove, btns, preBtn, inBtn,  nextBtn, one;
	btns = document.querySelectorAll('input');
	preBtn = btns[0];
	inBtn = btns[1];
	nextBtn = btns[2];
	one = document.querySelector('.one');
	treeMove = new TreeMove();

	addEvent(preBtn, 'click', function(){
		treeMove.preOrder(one);
		treeMove.animation();
	});

	addEvent(inBtn, 'click', function(){
		treeMove.inOrder(one);
		treeMove.animation();
	});

	addEvent(nextBtn, 'click', function(){
		treeMove.nextOrder(one);
		treeMove.animation();
	});

	function addEvent(ele, event, fn){
		if(ele.addEventListener){
			ele.addEventListener(event, fn, false);
		} else if(ele.attachEvent){
			ele.attachEvent('on' + event, fn);
		} else{
			ele['on' + event] = fn;
		}
	}

})();

/**
 * queue:渲染用对象队列
 * isMove：判断是否在执行运动
 */
function TreeMove(){
	this.queue = [];
	this.isMove =false;
}

/*前序*/
TreeMove.prototype.preOrder = function(ele){
	console.log(this.queue);
	var len = ele.children.length;
	this.queue.push(ele);
	if(ele.children[0]){
		this.preOrder(ele.children[0]);
	}
	if(ele.children[len - 1]){
		this.preOrder(ele.children[len - 1]);
	}
};

/*中序*/
TreeMove.prototype.inOrder = function(ele){
	console.log(this.queue);
	var len = ele.children.length;
	if(ele.children[0]){
		this.inOrder(ele.children[0]);
	}
	this.queue.push(ele);
	if(ele.children[len - 1]){
		this.inOrder(ele.children[len - 1]);
	}
};

/*后序*/
TreeMove.prototype.nextOrder = function(ele){
	var len = ele.children.length;
	if(ele.children[0]){
		this.nextOrder(ele.children[0]);
	}
	if(ele.children[len - 1]){
		this.nextOrder(ele.children[len - 1]);
	}
	this.queue.push(ele);
};

/*运动*/
TreeMove.prototype.animation = function(ele){
	var queue, num, self, timer;
	queue = this.queue;
	num = 0;
	self = this;
	this.queue = [];
	
	if(!this.isMove){
		this.isMove = true;
		queue[num].style.backgroundColor = '#00F4BD';
		timer = setInterval(function(){
			if(num === queue.length - 1){
				queue[num].style.backgroundColor = '#fff';
				self.isMove = false;
				clearInterval(timer);
			} else{
				num++;
				queue[num -1].style.backgroundColor = '#fff';
				queue[num].style.backgroundColor = '#00F4BD';
			}
		}, 300);
	}
};



