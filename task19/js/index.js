/*事件绑定兼容处理*/
function addEvent(ele, event, fn){
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

	/*验证是否为10-100之间的数字*/
	validate: function(str){
		return /^[1-9][0-9]$/.test(str);
	},

	pushPublic: function(fn){
		var num, total;
		num = oInp.value;
		total = oResult.children.length; 
		if(total >= 60){
			alert('元素个数超出范围！');
			return;
		}
		if(this.validate(num)){
			fn.call(this.str, num);
			this.render();
		} else{
			alert("请输入数字,且在10到100之间！");
		}
	},

	/*左入*/
	leftPush: function(){
		this.pushPublic([].unshift);
	},

	/*右入*/
	rightPush: function(){
		this.pushPublic([].push);
	},

	outPublic: function(fn){
		if(this.str.length){
			alert(fn.call(this.str));
			this.render();
		} else{
			alert('没有可以删除的元素！');
		}
	},

	/*左出*/
	leftShift: function(){
		this.outPublic([].shift);
	},

	/*右出*/
	rightPop: function(){
		this.outPublic([].pop);
	},

	randomData: function(){
		for (var i = 0; i < 20; i++) {
			this.str[i] = Math.floor(Math.random() * 89 + 10);
		}
		this.render();
	},

	/*冒泡算法*/
	bubbleSort: function(arr){
		var aDiv = oResult.children, len = arr.length, i = 0, j = 0, tmp;

		sortNum();

		function sortNum(){

			if(i < len){

				if(j < len - i -1){

					aDiv[j].style.backgroundColor ='#ccc';
					aDiv[j + 1].style.backgroundColor = '#ccc';
					if(arr[j] > arr[j + 1]){

						aDiv[j].style.backgroundColor = '#FF5341';

						tmp = arr[j];
						arr[j] = arr[j + 1];
						arr[j + 1] = tmp;

						oResult.insertBefore(aDiv[j + 1], aDiv[j]);

						j++;
						setTimeout(sortNum, 100);

					} else{

						aDiv[j + 1].style.backgroundColor = '#FF5341';
						j++;
						setTimeout(sortNum, 100);
					}

				} else{

					i++;
					j = 0;
					setTimeout(sortNum, 100);

				}

			} else{
				aDiv[0].style.backgroundColor = '#FF5341';
			}
		}

	},

	/*渲染函数*/
	render: function(){
		oResult.innerHTML = this.str.map(function(item){
			return 	`<div style='height: ${item*2}px' title = ${item}></div>`;
		}).join('');
	},

	/*删除对应的节点*/
	del: function(num){
		this.str.splice(num, 1);
		this.render();
	}
};



addEvent(aBtn[0], 'click', function(){
	queue.leftPush();
});
addEvent(aBtn[1], 'click', function(){
	queue.rightPush();
});
addEvent(aBtn[2], 'click', function(){
	queue.leftShift();
});
addEvent(aBtn[3], 'click', function(){
	queue.rightPop();
});
addEvent(aBtn[4], 'click', function(){
	queue.randomData();
});
addEvent(aBtn[5], 'click', function(){
	queue.bubbleSort(queue.str);
});
addEvent(oResult, 'click', function(e){
	var oTarget, num;
	if(e.target && e.target.tagName.toLowerCase() === 'div') oTarget = e.target;
	num = [].indexOf.call(oTarget.parentNode.children, oTarget);
	alert(queue.str[num]);
	queue.del(num);
});