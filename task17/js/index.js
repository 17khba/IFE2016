window.onload = function(){
    /* 数据格式演示
  var aqiSourceData = {
    "北京": {
      "2016-01-01": 10,
      "2016-01-02": 10,
      "2016-01-03": 10,
      "2016-01-04": 10
    }
  };
  */

  // 以下两个函数用于随机模拟生成测试数据
  function getDateStr(data){
    var y = data.getFullYear(),
        m = data.getMonth() + 1,
        d = data.getDate();
    m = m < 10 ? '0' + m : m;
    d = d < 10 ? '0' + d : d;
    return  `${y}-${m}-${d}`;
  }

  function randomBuildData(seed) {
    /*dat计算日期，datStr当key值使用*/
    var returnData = {},
        dat = new Date("2016-01-01"),
        datStr = '';
    for (var i = 1; i < 92; i++) {
      datStr = getDateStr(dat);
      returnData[datStr] = Math.ceil(Math.random() * seed);
      dat.setDate(dat.getDate() + 1);
    }
    return returnData;
  }

  var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
  };


  // 用于渲染图表的数据
  var chartData = {},
      oCont = document.getElementsByClassName('aqi-chart-wrap')[0],
      oField = document.getElementById('form-gra-time'),
      aInp = oField.getElementsByTagName('input'),
      oSel = document.getElementById('city-select'),
      colors = ['58F2D0', '66A1F3', '86FA5B', 'FD5C75', '60CBF4', '996AF5', '5BF69E', 'CBC041', 'FF943B', '00DADA', 'D8FD71', 'FD3AC2'];

  // 记录当前页面的表单选项
  var pageState = {
    nowSelectCity: '北京',
    nowGraTime: "day"
  };


  function bind(ele, event, fn){
    return ele.addEventListener ? ele.addEventListener(event, fn, false) : ele.attachEvent('on' + evnet, fn);
  }
  /**
   * 渲染图表
   */
  function renderChart() {
    var str = '', color;
    for(var key in chartData){
      color = colors[Math.floor(Math.random() * 12)];
      str += `<div style="height: ${chartData[key]}px; background-color: ${color};"><p class="tit"><span>${key}</span><span>AQI:]${chartData[key]}</span></p></div>`;
    }
    oCont.innerHTML = str;
  }

  /**
   * 日、周、月的radio事件点击时的处理函数
   */
  function graTimeChange() {
    // 确定是否选项发生了变化 
    if(pageState.nowGraTime == this.value){
      return;
    } else{
      pageState.nowGraTime = this.value;
    }
    // 设置对应数据
    initAqiChartData();
    // 调用图表渲染函数
    renderChart();
  }

  /**
   * select发生变化时的处理函数
   */
  function citySelectChange() {
    // 确定是否选项发生了变化 
    if(pageState.nowSelectCity == this.value){
      return;
    } else{
      pageState.nowSelectCity = this.value;
    }
    // 设置对应数据
    initAqiChartData();
    // 调用图表渲染函数
    renderChart();
  }

  /**
   * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
   */
  function initGraTimeForm() {
    for (var i = 0; i < aInp.length; i++) {
      bind(aInp[i], 'click', graTimeChange);
    }

  }

  /**
   * 初始化城市Select下拉选择框中的选项
   */
  function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var str = '';
    for(var city in aqiSourceData){
      str += `<option>${city}</option>`;
    }
    oSel.innerHTML = str;
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    bind(oSel, 'change', citySelectChange);
  }

  /**
   * 初始化图表需要的数据格式
   */
  function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    var nowcity = aqiSourceData[pageState.nowSelectCity];
    // 处理好的数据存到 chartData 中
    if(pageState.nowGraTime == 'day'){
        chartData = nowcity;
      }
    if(pageState.nowGraTime == 'week'){
      chartData = {};
      var contsum = 0, daysum = 0, week = 0;
      for(var t in nowcity){
        contsum += nowcity[t];
        daysum ++;
        if(new Date(t).getDay() == 6){
          week++;
          chartData[`第${week}周`] = Math.floor(contsum / daysum);
          contsum = daysum = 0;
        }
      }
      if(daysum !== 0){
        week++;
        chartData[`第${week}周`] = Math.floor(contsum / daysum);
      }
    }
    if(pageState.nowGraTime == 'month'){
      chartData = {};
      var contsum = 0, daysum = 0, month = 0;
      for(var n in nowcity){
        contsum += nowcity[n];
        daysum++;
        if(new Date(n).getMonth() !== month){
          month++;
          chartData[`第${month}月`] = Math.floor(contsum / daysum);
          contsum = daysum = 0;
        }
      }
      if(daysum !== 0){
        month++;
        chartData[`第${month}月`] = Math.floor(contsum / daysum);
      }
    }
  }

  /**
   * 初始化函数
   */
  function init() {
    /*初始化单选按钮的点击事件*/
    initGraTimeForm();
    /*初始化下拉列表的点击事件*/
    initCitySelector();
    /*初始化图表需要的数据格式*/
    initAqiChartData();
    /*渲染图表*/
    renderChart();
  }

  init();
};