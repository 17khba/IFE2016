window.onload = function(){
		/**
	 * aqiData，存储用户输入的空气指数数据
	 * 示例格式：
	 * aqiData = {
	 *    "北京": 90,
	 *    "上海": 40
	 * };
	 */
	var aqiData = {},
		oCity = document.getElementById('aqi-city-input'),
		oIndex = document.getElementById('aqi-value-input');

	/**
	 * 从用户输入中获取数据，向aqiData中增加一条数据
	 * 然后渲染aqi-list列表，增加新增的数据
	 */
	/*用户输入的城市名必须为中英文字符，空气质量指数必须为整数
	用户输入的城市名字和空气质量指数需要进行前后去空格及空字符处理（trim）
	用户输入不合规格时，需要给出提示（允许用alert，也可以自行定义提示方式）*/
	function addAqiData() {

		var city = oCity.value.trim(),
			index = oIndex.value.trim();

		if(!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)){
			alert('城市名必须为中英文字符!');
			return;
		}

		if(!index.match(/^\d+$/)){
			alert('空气质量指数必须为整数');
			return;
		}

		aqiData[city] = index;

	}

	/**
	 * 渲染aqi-table表格
	 */
	function renderAqiList() {
		var str = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';

		for(var key in aqiData){
			str += `<tr><td>${key}</td><td>${aqiData[key]}</td><td><button data-city=${key}>删除</button></td></tr>`;
		}

		$('aqi-table').innerHTML = str;

	}

	/**
	 * 点击add-btn时的处理逻辑
	 * 获取用户输入，更新数据，并进行页面呈现的更新
	 */
	function addBtnHandle() {
	  addAqiData();
	  renderAqiList();
	}

	/**
	 * 点击各个删除按钮的时候的处理逻辑
	 * 获取哪个城市数据被删，删除数据，更新表格显示
	 * 用户可以点击表格列中的“删除”按钮，删掉那一行的数据
	 * 
	 */
	function delBtnHandle(city) {
	  // do sth.
	  delete aqiData[city];
	  renderAqiList();
	}

	function init() {

	  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	  $('add-btn').onclick = addBtnHandle;
	  $('aqi-city-input').onkeyup = $('aqi-value-input').onkeyup= function(e){
	  	if(e.keyCode == 13){
	  		addBtnHandle();
	  	}
	  };
	  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	  $('aqi-table').onclick = function(e){
	  	if(e.target.tagName.toLowerCase() == 'button') delBtnHandle.call(null, e.target.dataset.city);
	  };

	}

	function $(ele){

	  return document.getElementById(ele);

	}

	init();


};