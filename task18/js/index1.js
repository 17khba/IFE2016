/*事件绑定兼容处理*/
function addEvnet(ele, event, fn){
	if(ele.addEventListener){
		ele.addEventListener(event, fn, false);
	} else if(ele.attachEvent){
		ele.attachEvent('on' + event, fn);
	} else{
		ele['on' + event] = fn;
	}
}

/*获取元素*/
function $(ele){
	return /^\.[a-zA-Z]+$/.test(ele) ? document.querySelectorAll(ele) : document.querySelector(ele);
}

var oInp = $('input'),
	aBtn = $('.btn'),
	oResult = $('#result');

var queue = {

	/*渲染所用的数据*/
	str: [],

	/*验证是否为数字*/
	validate: function(str){
		return /^\d+$/.test(str);
	},

	/*左入*/
	leftPush: function(){
		var num = oInp.value;
		console.dir(this);
		if(this.validate(num)){
			this.str.unshift(num);
			this.render();
		} else{
			alert('请输入要添加的值！');
		}
	},

	/*右入*/
	rightPush: function(){
		var num = oInp.value;
		if(this.validate(num)){
			this.str.push(num);
			this.render();
		} else{
			alert('请输入要添加的值！');
		}
	},

	/*左出*/
	leftShift: function(){
		if(this.str[0]){
			alert(this.str.shift());
			this.render();
		} else{
			alert('没有可以删除的元素！');
		}
	},

	/*右出*/
	rightPop: function(){
		if(this.str[this.str.length - 1]){
			alert(this.str.pop());
			this.render();
		} else{
			alert('没有可以删除的元素！');
		}
	},

	/*渲染函数*/
	render: function(){
		oResult.innerHTML = this.str.map(function(item){
			return 	`<div>${item}</div>`;
		}).join('');
	},

	/*删除对应的节点*/
	del: function(num){
		this.str.splice(num, 1);
		this.render();
	}
};

addEvnet(aBtn[0], 'click', function(){
	queue.leftPush();
});
addEvnet(aBtn[1], 'click', function(){
	queue.rightPush();
});
addEvnet(aBtn[2], 'click', function(){
	queue.leftShift();
});
addEvnet(aBtn[3], 'click', function(){
	queue.rightPop();
});
addEvnet(oResult, 'click', function(e){
	var oTarget, num;
	if(e.target && e.target.tagName.toLowerCase() === 'div') oTarget = e.target;
	num = [].indexOf.call(oTarget.parentNode.children, oTarget);
	alert(queue.str[num]);
	queue.del(num);
});