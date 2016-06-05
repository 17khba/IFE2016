/*存放要操作的对象*/
var data = [];

function $(ele){
	return document.querySelector(ele);
}

/*deal函数只接受两个形参，其他参数通过实参获得；*/
function deal(fn, error){
	var args = [].slice.call(arguments, 2);
	return function(e){
		/*事件对象留给getClickIndex方法判断target使用*/
		try{
			/*arg值的类型为数组*/
			arg = args.map(function(item){
				return typeof item === 'function' ? item(e) : item;
			});
			var result = fn.apply(data, arg);
			if(error !== null){
				error(result);
			}
			/*apply不能用call替代*/
		} catch(ex){
			alert(ex.message);
		}
		render();
	};
}

function getInpValue(){
	var oVal = $('input').value;
	if(!validate(oVal)) throw error('请输入内容！');
	return parseFloat(oVal);
}

function getClickIndex(e){
	if(e.target && e.target.tagName.toLowerCase() === 'div'){
		var oNode = e.target;
	}
	return [].indexOf.call(oNode.parentNode.children, oNode);
}

/*数字验证*/
function validate(str){
	return /^\d+$/.test(str);
}

function render(){
	$('#result').innerHTML = data.map(function(item){
		return `<div>${item}</div>`;
	}).join('');
}


$('#left_in').onclick = deal([].unshift, null, getInpValue);
$('#rig_in').onclick = deal([].push, null, getInpValue);
$('#left_out').onclick = deal([].shift, window.alert);
$('#rig_out').onclick = deal([].pop, window.alert);
$('#result').onclick = deal([].splice, null, getClickIndex, 1);
/*deal()中的第一个参数表示要做的队列操作，第二个检测是否有异常需要抛出，第三个用来获取input值或删除data数组对象，第四个参数表示要从data数组中删除对象的个数；*/