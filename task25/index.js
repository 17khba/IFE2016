/*构造函数+原型*/
// function TreeNode(obj){
// 	this.parent = obj.parent;
// 	this.childs = obj.childs || [];
// 	this.data = obj.data || "";				//对应的节点文本
// 	this.selfElement = obj.selfElement;		//对应的dom节点
// 	this.selfElement.TreeNode = this;		//指向自己的实例
// }

/*每定义一个函数，就会同时为其创建一个prototype对象,这个对象也会自动获取一个新的constructor属性*/
// TreeNode.prototype = {

// 	constructor: TreeNode,

// 	render: function(arrow, visible, Highlight, disHighlight){
// 		if(arguments.length < 3){
// 			Highlight = false;
// 			disHighlight = false;
// 		}
// 		if(arrow){
// 			if(this.isLeaf()){
// 				this.selfElement.querySelector('.arrow').className = 'arrow empty-arrow';
// 			} else if(this.isFolded()){
// 				this.selfElement.querySelector('.arrow').className = 'arrow right-arrow';
// 			} else{
// 				this.selfElement.querySelector('.arrow').className = 'arrow down-arrow';
// 			}
// 		}
// 		if(visible){
// 			if(this.selfElement.className.indexOf('nodebody-visible') === -1){
// 				this.selfElement.className = 'nodebody-visible';
// 			} else{
// 				this.selfElement.className = 'nodebody-hidden';
// 			}
// 		}
// 		if(Highlight){
// 			this.selfElement.querySelector('.node-title').className = 'node-title node-title-highlight';
// 		}
// 		if(disHighlight){
// 			this.selfElement.querySelector('.node-title').className = 'node-title';
// 		}
// 	},

// 	/*判断是否有子元素*/
// 	isLeaf: function(){
// 		return this.childs.length === 0;
// 	},

// 	/*判断是否处理折叠状态*/
// 	isFolded: function(){
// 		if(this.isLeaf()) return false;
// 		if(this.childs[0].selfElement.className === 'nodebody-visible') return false;
// 		return true;
// 	},

// 	/*改变折叠状态*/
// 	toggleFold: function(){
// 		if(this.isLeaf()) return this;
// 		for (var i = 0; i < this.childs.length; i++) {
// 			this.childs[i].render(false, true);
// 		}
// 		this.render(true, false);
// 		return this;
// 	},

// 	deleteNode: function(){
// 		var i;
// 		if(!this.isLeaf()){
// 			for (i = 0; i < this.childs.length; i++) {
// 				this.childs[i].deleteNode();
// 			}
// 		}

// 		this.parent.selfElement.removeChild(this.selfElement);

// 		for (i = 0; i < this.parent.childs.length; i++) {
// 			if(this.parent.childs[i] === this){
// 				this.parent.childs.splice(i, 1);
// 			}
// 		}
// 		this.parent.render(true, false);
// 	},

// 	addChild: function(text){
// 		if(text === null) return this;
// 		if(text.trim() === ''){
// 			alert('节点内容不能为空！');
// 			return this;
// 		}
// 		var newNode, newHead, newArrow, newTit, newSpace, newAdd, newDelete;
// 		newNode = document.createElement('div');
// 		newNode.className = 'nodebody-visible';
// 		newHead = document.createElement('label');
// 		newHead.className = 'node-header';
// 		newArrow = document.createElement('div');
// 		newArrow.className = 'arrow empty-arrow';
// 		newTit = document.createElement('span');
// 		newTit.className = 'node-title';
// 		newTit.textContent = text;
// 		newSpace = document.createElement('span');
// 		newSpace.innerHTML = '&nbsp;&nbsp;';
// 		newAdd = document.createElement('img');
// 		newAdd.className = 'addIcon';
// 		newAdd.src = 'img/add.png';
// 		newDelete = document.createElement('img');
// 		newDelete.className = 'deleteIcon';
// 		newDelete.src = 'img/delete.png';
// 		newHead.appendChild(newArrow);
// 		newHead.appendChild(newTit);
// 		newHead.appendChild(newSpace);
// 		newHead.appendChild(newAdd);
// 		newHead.appendChild(newDelete);
// 		newNode.appendChild(newHead);
// 		this.selfElement.appendChild(newNode);
// 		this.childs.push(new TreeNode({parent: this, childs: [], data: text, selfElement: newNode}));
// 		this.render(true, false);
// 		return this;
// 	}

// };


/*var root = new TreeNode({parent: null, childs: [], data: "前端攻城狮", selfElement: document.querySelectorAll('.nodebody-visible')[0]});

addEvent(root.selfElement, 'click', function(e){
	var oTarget, oNode, selfNode;
	oTarget = e.target || e.srcElement;
	oNode = oTarget;
	while(oNode.className.indexOf('nodebody') === -1){
		oNode = oNode.parentNode;
	}
	selfNode = oNode.TreeNode;
	if(oTarget.className.indexOf('node-title') !== -1 || oTarget.className.indexOf('arrow') !== -1){
		selfNode.toggleFold();
	} else if(oTarget.className === 'addIcon'){
		selfNode.addChild(prompt('请输入节点名称！'));
	} else if(oTarget.className === 'deleteIcon'){
		selfNode.deleteNode();
	}
});

root.search = function(txt){
	var resultList, queue, current, i;
	resultList = [];
	queue = [];
	current = this;
	queue.push(current);
	while(queue.length > 0){
		current = queue.shift();
		current.render(false, false, false, true);
		if(current.data === txt) resultList.push(current);
		for (i = 0; i < current.childs.length; i++) {
			queue.push(current.childs[i]);
		}
	}
	return resultList;
};

addEvent(document.querySelector('#search'), 'click', function(e){
	var txt, resultList, oNode;
	txt = document.querySelector('#searchTxt').value;
	if(txt === ''){
		document.querySelector('#result').textContent = '请输入要查找的内容！';
		return;
	}
	resultList = root.search(txt);
	if(resultList.length === 0){
		document.querySelector('#result').textContent = '没有找到你要查找的内容！';
		return;
	} else{
		document.querySelector('#result').textContent = '共找到' + resultList.length + '个符合条件的节点';
		for (var i = 0; i < resultList.length; i++) {
			oNode = resultList[i];
			oNode.render(false, false, true, false);
			while(oNode.parent.selfElement.className === 'nodebody-hidden'){
  				oNode.parent.toggleFold();
  				oNode = oNode.parent;
			}
		}
	}
});

addEvent(document.querySelector('#clear'), 'click', function(){
	document.querySelector('#searchTxt').value = '';
	document.querySelector('#result').textContent = '';
	root.search(null);
});



root.addChild('技术').addChild('IT公司').addChild('谈笑风生');
root.childs[0].addChild('HTML5').addChild('CSS3').addChild('JavaScript').addChild('PHP').addChild('Nodejs').toggleFold();
root.childs[0].childs[4].addChild('JavaScript').toggleFold();
root.childs[1].addChild('baidu').addChild('alibaba').addChild('tencent').toggleFold();
root.childs[2].addChild('皇室战争').addChild('精灵宝贝梦').addChild('部落冲突').toggleFold();
root.childs[2].childs[2].addChild('武神').toggleFold();


function addEvent(ele, event, fn){
	if(ele.addEventListener){
		ele.addEventListener(event, fn, false);
	} else if(ele.attachEvent){
		ele.attachEvent('on' + event, event);
	} else{
		ele['on' + evnet] = fn;
	}
}*/

function TreeNode(object){
	this.parent = object.parent || null;
	this.childs = object.childs || [];
	this.data = object.data;
	this.selfElement = object.selfElement;
	this.selfElement.TreeNode = this;
}

TreeNode.prototype = {

	render: function(arrow, visible, highlight, dishighlight){
		/*改变箭头显示方式*/
		if(arrow){
			if(this.isLeaf()){
				this.selfElement.querySelector('.arrow').className = 'arrow empty-arrow';
			} else if(this.isFolded()){
				this.selfElement.querySelector('.arrow').className = 'arrow right-arrow';
			} else{
				this.selfElement.querySelector('.arrow').className = 'arrow down-arrow';
			}
		}
		/*显示隐藏对应节点*/
		if(visible){
			if(this.selfElement.className.indexOf('visible') !== -1){
				this.selfElement.className = 'nodebody-hidden';
			} else{
				this.selfElement.className = 'nodebody-visible';
			}
		}
		/*高亮title*/
		if(highlight){
			this.selfElement.querySelector('.node-title').className = 'node-title highlight';
		}

		/*取消高亮效果*/
		if(dishighlight){
			this.selfElement.querySelector('.node-title').className = 'node-title';
		}
	},

	deleteNode: function(){
		var oParent, i;
		if(!this.isLeaf()){
			for (i = 0; i < this.childs.length; i++) {
				this.childs[i].deleteNode();
			}
		}
		oParent = this.parent;
		for (i = 0; i < oParent.childs.length; i++) {
			if(oParent.childs[i] === this){
				oParent.childs.splice(i, 1);
			}
		}
		oParent.selfElement.removeChild(this.selfElement);
		oParent.render(true, false);
	},

	addChild: function(txt){
		var newNode, newHead, newArrow, newTit, newSpace, addIcon, deleteIcon;
		if(txt.trim() === ''){
			alert('请输入新建节点的内容部分！');
			return this;
		}
		newNode = document.createElement('div');
		newNode.className = 'nodebody-visible';
		newHead = document.createElement('label');
		newHead.className = 'node-header';
		newArrow = document.createElement('div');
		newArrow.className = 'arrow empty-arrow';
		newTit = document.createElement('span');
		newTit.className = 'node-title';
		newTit.textContent = txt;
		newSpace = document.createElement('span');
		newSpace.innerHTML = '&nbsp;&nbsp';
		addIcon = document.createElement('img');
		addIcon.className = 'addIcon';
		addIcon.src = 'img/add.png';
		deleteIcon = document.createElement('img');
		deleteIcon.className = 'deleteIcon';
		deleteIcon.src = 'img/delete.png';
		newHead.appendChild(newArrow);
		newHead.appendChild(newTit);
		newHead.appendChild(newSpace);
		newHead.appendChild(addIcon);
		newHead.appendChild(deleteIcon);
		newNode.appendChild(newHead);
		this.selfElement.appendChild(newNode);
		this.childs.push(new TreeNode({parent: this, childs: [], data: txt, selfElement: newNode}));
		this.render(true, false);
		return this;
	},

	/*判断是否有子节点*/
	isLeaf: function(){
		return this.childs.length === 0;
	},

	/*判断是否处于折叠状态*/
	isFolded: function(){
		if(this.isLeaf()) return false;
		if(this.childs[0].selfElement.className === 'nodebody-visible') return false;
		return true;
	},

	/*三角展开、折叠，子元素显示、隐藏操作*/
	toggleFold: function(){
		if(this.isLeaf()) return false;
		for (var i = 0; i < this.childs.length; i++) {
			this.childs[i].render(false, true);
		}
		this.render(true, false);
	}
};

var root = new TreeNode({parent: null, childs: [], data: '前端攻城狮', selfElement: document.querySelector('.nodebody-visible')});

addEvent(root.selfElement, 'click', function(e){
	var oTarget, oParent, newNode;
	oTarget = e.target || e.srcElement;
	oParent = oTarget;
	while(oParent.className.indexOf('nodebody') === -1){
		oParent = oParent.parentNode;
	}
	newNode = oParent.TreeNode;		/*对应的实例*/
	if(oTarget.className.indexOf('title') !== -1 || oTarget.className.indexOf('arrow') !== -1){
		newNode.toggleFold();
	} else if(oTarget.className === 'addIcon'){
		newNode.addChild(prompt('请输入节点名称！'));
	} else if(oTarget.className === 'deleteIcon'){
		newNode.deleteNode();
	}
});

root.search = function(txt){
	var resultList, queue, current;
	resultList = [];
	queue = [];
	current = this;
	queue.push(current);
	while(queue.length > 0){
		current = queue.shift();
		current.render(false, false, false, true);
		if(current.data === txt) resultList.push(current);
		for (var i = 0; i < current.childs.length; i++) {
			queue.push(current.childs[i]);
		}
	}
	return resultList;
};

addEvent(document.querySelector('#search'), 'click', function(){
	var oTxt, resultList;
	oTxt = document.querySelector('#searchTxt').value.trim();
	if(oTxt === ''){
		document.querySelector('#result').textContent = '请输入要查找的内容！';
		return;
	}
	resultList = root.search(oTxt);
	if(resultList.length === 0){
		document.querySelector('#result').textContent = '没有找到符合条件的节点！';
		return;
	} else{
		var oNode, i;

		document.querySelector('#result').textContent = '匹配到' + resultList.length + '个符合条件的节点';

		for (i = 0; i < resultList.length; i++) {
			oNode = resultList[i];
			oNode.render(false, false, true, false);
			while(oNode.parent !== null){
				/*折叠状态时才执行展开操作，否则跳过*/
				if(oNode.selfElement.className === 'nodebody-hidden'){
					oNode.parent.toggleFold();
				}
				oNode = oNode.parent;
			}
		}
	}
});

addEvent(document.querySelector('#clear'), 'click', function(){
	document.querySelector('#searchTxt').value = '';
	document.querySelector('#result').textContent = '';
	root.search(null);
});

root.addChild('技术').addChild('IT公司').addChild('谈笑风生');
root.childs[0].addChild('angluarjs').addChild('reactjs').addChild('vuejs').addChild('nodejs').toggleFold();
root.childs[1].addChild('SuperCell').addChild('Alibaba').addChild('Tencent').toggleFold();
root.childs[2].addChild('php-最好的语言').addChild('h5是万能的').toggleFold();
root.childs[2].childs[1].addChild('css3').addChild('h5').addChild('js').toggleFold();

document.querySelector('#searchTxt').value = 'js';

function addEvent(ele, event, fn){
	if(ele.addEventListener){
		ele.addEventListener(event, fn, false);
	} else if(ele.attachEvent){
		ele.attachEvent('on' + event, fn);
	} else{
		ele['on' + event] = fn;
	}
}