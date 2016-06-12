/*兼容事件绑定*/
function addEvent(ele, event, fn){
	if(ele.addEventListener){
		ele.addEventListener(event, fn, false);
	} else if(ele.attachEvent){
		ele.attachEvent('on' + event, fn);
	} else{
		ele['on' + event] = fn;
	}
}

function $(ele){
	return document.querySelector(ele);
}

var tagInput, tagBox, hobbyInput, btn, hobbyBox, tagList, hobbyList;
tagInput = $('input');
tagBox = $('.tagBox');
hobbyInput = $('#hobby');
btn = $('#btn');
hobbyBox = $('.hobbyBox');
tagList = new CreateList(tagBox);
hobbyList = new CreateList(hobbyBox);

addEvent(tagInput, 'keyup', showTag);
addEvent(btn, 'click', showHobby);

function CreateList(box){
	this.queue = [];
	this.render = function(){
		var str = '';
		this.queue.forEach(function(e){
			str += `<span>${e}</span>`;
		});
		box.innerHTML = str;
	};
}


CreateList.prototype.rightPush = function(ele){
	this.queue.push(ele);
	this.render();
};

CreateList.prototype.leftShift = function(){
	this.queue.shift();
	this.render();
};

function showTag(){
	var inpValue, data, newTag;
	inpValue = tagInput.value;
	if(/,|，|、|:|;|。|\.|\s|\n|\r|\t/.test(inpValue)){
		data = splitTag(inpValue);
		if(!data[0]){
			tagInput.value = '';
			return;
		}
		newTag = data[0];
		if(tagList.queue.indexOf(newTag) === -1){
			tagList.rightPush(newTag);
			if(tagList.queue.length > 10){
				tagList.leftShift();
			}
		}
		tagList.render();
		tagInput.value = '';
	}
}

function splitTag(val){
	var inpArray = val.trim().split(/,|，|、|:|;|。|\.|\s|\n|\r|\t/);
	return inpArray;
}

function showHobby(){
	var inpValue, data, newTag;
	inpValue = hobbyInput.value;
	data = splitTag(inpValue);
	if(!data[0]){
		hobbyInput.value = '';
		return;
	}
	newTag = data[0];
	if(hobbyList.queue.indexOf(newTag) === -1){
		hobbyList.rightPush(newTag);
		if(hobbyList.queue.length > 10){
			hobbyList.leftShift();
		}
	}
	hobbyList.render();
	hobbyInput.value = '';
}