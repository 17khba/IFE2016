(function(){
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
	addEvent(tagBox, 'mouseover', function(e){
		e.target.textContent = '删除：' + e.target.textContent;
	});
	addEvent(tagBox, 'mouseout', function(e){
		e.target.textContent = e.target.textContent.replace(/删除：/, '');
	});
	addEvent(tagBox, 'click', function(e){
		var oTxt, Len, i;
		oTxt = e.target.textContent.replace(/删除：/, '');
		Len = tagList.queue.length;
		for(i = 0;i < Len; i++){
			if(tagList.queue[i] === oTxt){
				delete tagList.queue[i];
			}
		}
		tagList.render();
	});

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
		if(/,|，|、|:|;|。|\.|\s/.test(inpValue) || event.keyCode == 13){
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
		var inpArray = val.trim().split(/,|，|、|:|;|。|\.|\s/);
		return inpArray;
	}

	function showHobby(){
		var data;
		data = splitTag(hobbyInput.value);
		data.forEach(function(ele){
			if(hobbyList.queue.indexOf(ele) === -1){
				if(ele === '') return;
				hobbyList.rightPush(ele);
				if(hobbyList.queue.length > 10){
					hobbyList.leftShift();
				}
			}
		});
		hobbyList.render();
		hobbyInput.value = '';
	}
})();

//共有：去重，删除，渲染


