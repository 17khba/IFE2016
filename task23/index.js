/**
 * 修复的问题：
 * 1.搜索内容不区分大小写；
 * 2.搜索内容为空时，不匹配内容；
 */
var oBtns, one, onoff, timer, num;
oBtns = document.querySelector('.btns').querySelectorAll('button');
one = document.querySelector('#one');
onoff = false;
timer = null;
num = 0;	/*自增标识符*/

function addEvent(ele, event, fn){
	if(ele.addEventListener){
		ele.addEventListener(event, fn, false);
	} else if(ele.attachEvent){
		ele.attachEvent('on' + event, fn);
	} else{
		ele['on' + event] = fn;
	}
}

/*深度优先遍历*/
function traversalDF(node, queue){
	if(node){
		queue.push(node);
		for (var i = 0; i < node.children.length; i++) {
			traversalDF(node.children[i], queue);
		}
	}
}

/*广度优先遍历*/
function traversalBF(node, queue){
	if(node){
		queue.push(node);
		traversalBF(node.nextElementSibling, queue);
		node = queue[num++];
		traversalBF(node.firstElementChild, queue);
	}
}

function reset(){
	var queue = [];
	traversalDF(one, queue);
	for (var i = 0; i < queue.length; i++) {
		queue[i].className = 'default';
	}
}

function traversalRender(queue, foundText){
	var i, len;
	i = 0;
	len = queue.length;
	if(foundText && queue[i].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g, '').toLowerCase() == foundText.toLowerCase()){
		queue[i].className = 'found';
		onoff = false;
		clearInterval(timer);
	} else{
		queue[i++].className = 'active';
	}
	onoff = true;
	timer = setInterval(function(){
		if(i < len){
			queue[i - 1].className = '';
			if(foundText && queue[i].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g, '').toLowerCase() == foundText.toLowerCase()){
				queue[i].className = 'found';
				onoff = false;
				clearInterval(timer);
			} else{
				queue[i++].className = 'active';
			}
		} else{
			queue[i - 1].className  = '';
			onoff = false;
			clearInterval(timer);
		}
	}, 500);
}

/*根据index值判断点击的按钮，做相应处理*/
function traversal(index){
	var queue, foundText;
	queue = [];
	switch(index){
		case 0:
			/*深度遍历*/
			traversalDF(one, queue);
			break;
		case 1:
			/*广度遍历*/
			num = 0;
			traversalBF(one, queue);
			break;
		case 2:
			/*深度搜索*/
			foundText = document.querySelector('input').value;
			traversalDF(one, queue);
			break;
		case 3:
			/*广度搜索*/
			num = 0;
			foundText = document.querySelector('input').value;
			traversalBF(one, queue);
			break;
	}
	reset();
	traversalRender(queue,foundText);
}


/**
 * [给四个按钮添加点击事件]
 */
function init(){
	for (var i = 0; i < oBtns.length; i++) {
		(function(){
			oBtns[i].index = i;
			addEvent(oBtns[i], 'click', function(){
				/*判断是否在遍历中...*/
				if(onoff){
					alert('正在遍历中...');
				} else{
					traversal(this.index);
				}
			});
		})(i);
	}
}

init();