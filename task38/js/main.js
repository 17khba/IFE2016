var data = (function() {
  var firstName = ["赵", "钱", "孙", "李", "周", "吴", "郑", "王", "冯", "陈", "楮", "卫", "蒋", "沈", "韩", "杨", "朱", "秦", "尤", "许", "何", "吕", "施", "张", "孔", "曹", "严", "华", "金", "魏", "陶", "姜", "戚", "谢", "邹", "喻", "柏", "水", "窦", "章", "云", "苏", "潘", "葛", "奚", "范", "彭", "郎", "鲁", "韦", "昌", "马", "苗", "凤", "花", "方"];

  var dataObj = {
    tit: ['姓名', '语文', '数学', '英语', '总分'],
    data: initData(10, 4)
  };

  function initData(total, n) {
    var arr = [];
    for (var i = 0; i < total; i++) {
      arr.push(renderData(n))
    }
    return arr;
  }

  function renderData(n) {
    var item = {};
    // 随机生成name
    var first = firstName[parseInt(Math.random() * 56)];
    var end = firstName[parseInt(Math.random() * 56)];
    item.name = first + end;
    // 随机生成data
    var arr = [];
    var sum = 0;
    var digital = null;
    for (var i = 1; i < n; i++) {
      digital = parseInt(Math.random() * 55) + 60;
      sum += digital;
      arr.push(digital);
    }
    arr.push(sum);
    item.value = arr;

    return item;
  }

  return dataObj;
})();

new RenderTab($('.tab_head'), $('.tab_body'), data);
