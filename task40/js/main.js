function Canlendar (ele, option) {
  var element = document.querySelector(ele);
  this.wraper = element !== null && $(ele);
  this.date = new Date();
  // 当前高亮日期在table中的坐标
  this.rows = 0;
  this.cells = 0;
  this.tab_head = $('<thead>');
  this.tab_body = $('<tbody>');
  this.format = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  if (isObj(option) && option.format && option.format)  $.extend(this.format, option.format);

  this.init(option);
}

Canlendar.prototype = {
  constructor: Canlendar,
  init: function () {
    this.createHead();
    this.createBody();
  },
  createHead: function () {
    var self = this;
    var _date = this.date;
    
    var _format = this.format;
    var tit = this.tab_head;

    var tr_one = '<tr>' +
                 '<th class="prev">&#xe667;</th>' + 
                 '<th colspan="5" class="timeInfo">' + getTimeStr(_date) + '</th>' + 
                 '<th class="next">&#xe668;</th>' + 
                 '</tr>';
    $(tr_one).appendTo(tit);

    var tr_two = $('<tr>');
    var th;
    for (var i = 0; i < _format.length; i++) {
      th = $('<th>').text(_format[i]).appendTo(tr_two);
    }
    tr_two.appendTo(tit);
    tit.appendTo(this.wraper);

    $('.prev').on('click', self.setPrevMonth.bind(self));
    $('.next').on('click', self.setNextMonth.bind(self));
  },
  createBody: function () {
    var self, timeObj, date, _date, _setDate, _getDate, isSameMonth, _tbody, _tr, _td;

    self = this;
    // 复制当前时间留待渲染用
    timeObj = new Date(this.date);
    date = this.date.getDate();
    _date = timeObj.getDate();
    // 设置日历startDate
    _setDate = timeObj.setDate(date - _date + 1);
    _setDate = timeObj.setDate(timeObj.getDate() - timeObj.getDay());
    _tbody = this.tab_body;

    for (var i = 1; i <= 6; i++) {
      _tr = $('<tr>');
      for (var j = 1; j <= 7; j++) {
        _getDate = timeObj.getDate();

        isSameMonth = timeObj.getMonth() === this.date.getMonth();
        isToday = isSameMonth && timeObj.getDate() === this.date.getDate();
        _td = $('<td>');

        // 不是同月的颜色变淡(添加prev_next类名)
        if (!isSameMonth) {
          _td.addClass('prev_next');
        }
        
        // 是否为当前日期
        if (isToday) {
          this.rows = i;
          this.cells = j;
          _td.addClass('today');
        }

        _td
          .text(_getDate)
          .appendTo(_tr);

        (function (i, j, isSameMonth) {
          _td.on('click', toggleDay.bind(_td, i, j, isSameMonth));
        })(i, j, isSameMonth);
        
        timeObj.setDate(_getDate + 1);
      }
      _tr.appendTo(_tbody);
    }

    _tbody.appendTo(this.wraper);

    function toggleDay (i, j, isSameMonth) {
      var _dat = self.date.getDate();
      var old_td = $('.today');
      var old_rows = self.rows;
      var old_cells = self.cells;
      var old_index = old_rows * 7 + old_cells;

      var new_index = i * 7 + j;
      self.date.setDate(new_index - old_index + _dat);

      self.rows = i;
      self.cells = j;

      if (!isSameMonth) {
        self.tab_body.html('');
        self.createBody();

        self.setTit();  
        return false;
      }

      old_td.removeClass('today');
      $(this).addClass('today');
      self.setTit();
    }

  },
  setTit: function () {
    var _dat = new Date(this.date);
    $('.timeInfo').text(getTimeStr(_dat));
  },
  _setMonth: function (MonthVal) {
    this.date.setMonth(MonthVal);

    var timeStr = getTimeStr(this.date);
    $('.timeInfo').text(timeStr);
    this.tab_body.html('');
    this.createBody();
  },
  setPrevMonth: function () {
    var prevMonth = this.date.getMonth() - 1;
    this._setMonth(prevMonth);
  },
  setNextMonth: function () {
    var nextMonth = this.date.getMonth() + 1;
    this._setMonth(nextMonth);
  }
}

function isObj (obj) {
  return [].toString.call(obj).slice(8, -1) === 'Object';
}

function getTimeStr (_dat) {
  var y = _dat.getFullYear();
  var m = _dat.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = _dat.getDate();
  d = d < 10 ? ('0' + d) : d;
  return y + '-' + m + '-' + d;
}

function canlendar (ele, obj) {
  return new Canlendar(ele, obj);
}

canlendar('.tab_canlendar', {
  format: ['日', '一', '二', '三', '四', '五', '六']
})