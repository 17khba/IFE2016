/**
 *queue：渲染用对象队列； 
 * isMove：判断运动是否在进行；
 */
var one, btns, preBtn, inBtn, nextBtn, queue, isMove, timer;
one = document.querySelector('.one');
btns = document.querySelectorAll('input');
preBtn = btns[0];
inBtn = btns[1];
nextBtn = btns[2];
queue = [];
isMove = false;
timer = null;

addEvent(preBtn, 'click', function(){
	preOrder(one);
	doMove();
});

addEvent(inBtn, 'click', function(){
	inOrder(one);
	doMove();
});

addEvent(nextBtn, 'click', function(){
	nextOrder(one);
	doMove();
});


/*前序遍历*/
function preOrder(node){
	if(node !== null && !isMove){
		queue.push(node);
		preOrder(node.firstElementChild);
		preOrder(node.lastElementChild);
	}
}

/*中序遍历*/
function inOrder(node){
	if(node !== null && !isMove){
		inOrder(node.firstElementChild);
		queue.push(node);
		inOrder(node.lastElementChild);
	}
}

/*后续遍历*/
function nextOrder(node){
	if(node !== null && !isMove){
		nextOrder(node.firstElementChild);
		nextOrder(node.lastElementChild);
		queue.push(node);
	}
}

function doMove(){
	var num = 0;
	if(!isMove){
		isMove = true;
		queue[num].style.backgroundColor = '#00F4BD';
		timer = setInterval(function(){
			if(num === queue.length - 1){
				queue[num].style.backgroundColor = '#FFF';
				queue = [];
				isMove = false;
				clearInterval(timer);
			} else{
				num++;
				queue[num -1].style.backgroundColor = '#FFF';
				queue[num].style.backgroundColor = '#00F4BD';
			}
		}, 300);
	}
}

function addEvent(ele, event, fn){
	if(ele.addEventListener){
		ele.addEventListener(event, fn, false);
	} else if(ele.attachEvent){
		ele.attachEvent('on' + event, fn);
	} else{
		ele['on' + event] = fn;
	}
}