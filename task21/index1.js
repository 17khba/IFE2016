/*方案二：构造加原型*/

/**
 * 涉及到的正则：
 * 1.String.protoytpe.match(/(^[^,|，| ]*)/)			=>	匹配除零或多个个不以，,或空格开头的值；
 * 2.String.prototype.split(/\.|,|，|`|、|;|:|：|\s/)	=>	将字符串用符号、换页符、换行符、回车符、制表符等符号拆分；
 * 3./(，|,| )$/.test()									=>	检测值是否以，|,| 符号结尾；
 */


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

var createTag = (function(){
	function _tag(input, output, btn){
		/**
		 * num记录输入值的个数，不能大于10;
		 * num为私有变量，外部无法访问；
		 */
		 console.log(input);
		var num;

		this.getNumber = function(){
			return num;
		};

		this.setNumber = function(newNum){
			num = newNum;
		};

		this.input = document.getElementById(input);

		this.output =document.getElementsByClassName(output)[0];

		this.btn = document.getElementById(btn);

		/*过滤输入框中的值*/
		this.getData = function(){
			var data;
			switch(input){
				case 'tag':
					data = this.input.value.trim().match(/(^[^,|，| ]*)/)[0];		//简单类型的值；
					break;
				case 'hobby':
					data = this.input.value.trim().split(/\.|,|，|`|、|;|:|：|\s/);	//数组类型的值；
					break;
			}
			return data;
		};


		/*渲染数据*/
		this.render = function(val){
			if(val === '') return;
			var txt = document.createElement('span');
			txt.textContent = val;
			this.output.appendChild(txt);
			num++;
		};

		this.setNumber(0);
		this.btn ? this.init('btnEvent') : this.init('keyEvent');
	}

	_tag.prototype = {
			delData: function(ele){
				this.output.removeChild(ele);
				this.setNumber(this.output.children.length);
			},
			/**
			 * 检测输入数据是否有重复
			 * @param {String} - val 输入的数据
			 * @return {Boolean} - 数据是否重复
			 */
			repeatData: function(val){
				for (var i = 0; i < this.output.children.length; i++) {
					if(this.output.children[i].textContent.localeCompare(val) === 0){
						this.input.value = '';
						return true;
					}
				}
			},

			init: function(type){
				/*初始化，input绑定键盘事件，btn绑定点击事件*/
				var self = this;
				addEvent(this.output, 'mouseover', function(e){
					e.target.textContent = '删除：' + e.target.textContent;
				});
				addEvent(this.output, 'mouseout', function(e){
					e.target.textContent = e.target.textContent.replace('删除：', '');
				});
				addEvent(this.output, 'click', function(e){
					self.delData(e.target);
				});
				switch(type){
					case 'keyEvent':
						addEvent(document, 'keyup', function(e){
							if(/(，|,| )$/.test(self.input.value) || e.keyCode === 13){
								self.repeatData(self.getData()) || self.render(self.getData());
								self.input.value = '';
								if(self.getNumber() > 10){
									self.delData(self.output.firstChild);
								}
							}
						});
						break;
					case 'btnEvent':
						addEvent(this.btn, 'click', function(){
							var i, Len = self.getData().length;
							for (i = 0; i < Len; i++) {
								/*要么重复，要么渲染*/
								self.repeatData(self.getData()[i]) || self.render(self.getData()[i]);
								if(self.getData() > 10) self.delData(self.output.firstChild);
							}
							self.input.value = '';
						});
						break;
				}
			}
		};

	/*返回类*/
	return _tag;
})();

var tag, hobby;
tag = new createTag('tag', 'tagBox');
hobby = new createTag('hobby', 'hobbyBox', 'btn');