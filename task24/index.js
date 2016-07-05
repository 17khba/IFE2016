/**
 * 修复选中元素被删除后立即添加元素时的错误--清空selectDiv的值，立即单机添加新元素弹出提示；
 */
var origin, one, delete_btn, insert_txt, insert_btn, traversal_btn, search_txt, search_btn, selectDiv, oParent, queue, timer, searchQueue, isFound;
origin = document.querySelector('.box');
one = document.querySelector('#one');
delete_btn = document.querySelector('#delete-btn');
insert_txt = document.querySelector('#insert-txt');
insert_btn = document.querySelector('#insert-btn');
traversal_btn = document.querySelector('#traversal-btn');
search_txt = document.querySelector('#search-txt');
search_btn = document.querySelector('#search-btn');
queue = [];
isFound = false;			/*判断是否找到要搜索的值*/
searchQueue = [];

/*利用事件委托查找点击元素*/
addEvent(origin, 'click', function(e){
	if(e.target.tagName !== 'DIV') return;
	reset();
	e.target.style.backgroundColor = '#FF8430';
	/*selectDiv存储选中的div元素*/
	selectDiv = e.target;
});

/*删除选择元素*/
addEvent(delete_btn, 'click', function(){
	if(!selectDiv){
		alert('请先选中节点');
	} else if(selectDiv === origin.children[0]){
		alert('源点不可删');
	} else{
		oParent = selectDiv.parentNode;
		oParent.removeChild(selectDiv);
		selectDiv = '';
	}
});

/*插入新增节点*/
addEvent(insert_btn, 'click', function(){
	var insertTxt = insert_txt.value;
	if(!insertTxt){
		alert('请输新增节点内容！');
	} else if(!selectDiv){
		alert('请选中要操作的节点！');
	} else{
		var newDiv = document.createElement('div');
		newDiv.innerText = insertTxt;
		selectDiv.appendChild(newDiv);
	}
});

/*遍历节点*/
addEvent(traversal_btn, 'click', function(){
	reset();
	preOrder(one);
	move(queue, 1);
});

/*搜索内容*/
addEvent(search_btn, 'click', function(){
	reset();
	var searchTxt = search_txt.value;
	if(search_txt === ''){
		alert('请输入搜索内容');
	} else{
		search(one, searchTxt);
		if(isFound){
			move(searchQueue, 2);
		} else{
			move(searchQueue, 3);
		}
	}
});

/*搜索匹配*/
function search(ele, searchTxt){
	var found = ele.innerHTML.split('<')[0].replace(/(^\s+)|(\s+$)/g, '').toLowerCase() === searchTxt.toLowerCase();
	if(!found && !isFound){
		searchQueue.push(ele);
		for (var i = 0; i < ele.children.length; i++) {
			search(ele.children[i], searchTxt);
		}
	} else if(found){
		searchQueue.push(ele);
		isFound = true;
		return;
	}
}

function reset(){
	var aDiv = origin.querySelectorAll('div');
	for (var i = 0; i < aDiv.length; i++) {
		aDiv[i].style.backgroundColor = '#BDF5E8';
	}
	clearInterval(timer);
	queue = [];
	searchQueue = [];
	isFound = false;
}

/*前序*/
function preOrder(ele){
	if(ele !== null){
		queue.push(ele);
		for (var i = 0; i < ele.children.length; i++) {
			preOrder(ele.children[i]);
		}
	}
}

/*运动*/
function move(result, index){
	var i, len;
	i = 0;
	len = result.length;
	result[i++].style.backgroundColor = '#FF8430';
	timer = setInterval(function(){
		if(i < len){
			result[i - 1].style.backgroundColor = '#BDF5E8';
			result[i++].style.backgroundColor = '#ff8340';
		} else if(index === 1){
			clearInterval(timer);
			result[len - 1].style.backgroundColor = '#BDF5E8';
		} else if(index === 2){
			clearInterval(timer);
			result[len - 1].style.backgroundColor = '#52B8DF';
		} else if(index === 3){
			clearInterval(timer);
			result[len - 1].style.backgroundColor = '#BDF5E8';
			alert('没有找到要查找的内容！');
		}
	}, 500);
}

/*事件绑定兼容*/
function addEvent(ele, event, fn){
	if(ele.addEventListener){
		ele.addEventListener(event, fn, false);
	} else if(ele.attachEvent){
		ele.attachEvent('on' + event, fn);
	} else{
		ele['on' + event] = fn;
	}
}