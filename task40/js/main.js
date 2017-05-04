function Canlendar (ele, option) {
  this.wraper = typeof ele === 'string' && $(ele);
  this.date = new Date();
  // 当前高亮日期在table中的坐标
  this.rows = 0;
  this.cells = 0;
  this.tab_head = $('<thead>');
  this.tab_body = $('<tbody>');
  this.format = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  this.init(option);
}

Canlendar.prototype = {
  constructor: Canlendar,
  init: function (option) {
    var _dat = new Date();
    $.extend(this.format, isObj(option) && option.format);
    this.createHead();
    this.createBody(_dat);
  },
  createHead: function () {
    var self = this;
    var _date = this.date;
    
    var _format = this.format;
    var tit = this.tab_head;

    var tr_one = '<tr>' +
                 '<th class="prev">&#xe667;</th>' + 
                 '<th colspan="5" class="info">' + getTimeStr(_date) + '</th>' + 
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
  createBody: function (_dat) {
    var self, date, _date, _setDate, _getDate, isSameMonth, _tbody, _tr, _td;

    self = this;
    date = this.date.getDate();
    _date = _dat.getDate();
    // 设置日历startDate
    _setDate = _dat.setDate(date - _date + 1);
    _setDate = _dat.setDate(_dat.getDate() - _dat.getDay());
    _tbody = this.tab_body;

    for (var i = 1; i <= 6; i++) {
      _tr = $('<tr>');
      for (var j = 1; j <= 7; j++) {
        _getDate = _dat.getDate();

        isSameMonth = _dat.getMonth() === this.date.getMonth();
        isToday = _dat.getTime() === this.date.getTime();
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

        (function (i, j) {
          _td.on('click', function () {
              var _dat = self.date.getDate();
              var old_td = $('.today');
              var old_rows = self.rows;
              var old_cells = self.cells;
              var old_index = old_rows * 7 + old_cells;

              var new_index = i * 7 + j;
              self.date.setDate(new_index - old_index + _dat);

              old_td.removeClass('today');
              $(this).addClass('today');
              self.rows = i;
              self.cells = j;
              self.setTit();
            })
        })(i, j);
        
        _dat.setDate(_getDate + 1);
      }
      _tr.appendTo(_tbody);
    }

    _tbody.appendTo(this.wraper);

  },
  setTit: function () {
    var _dat = new Date(this.date);
    $('.info').text(getTimeStr(_dat));
  },
  setPrevMonth: function () {
    var prevMonth = this.date.getMonth() - 1;
    this.date.setMonth(prevMonth);

    var _dat = new Date(this.date);
    $('.info').text(getTimeStr(_dat));
    // this.setTit();
    this.tab_body.html('');
    this.createBody(_dat);
  },
  setNextMonth: function () {
    var nextMonth = this.date.getMonth() + 1;
    this.date.setMonth(nextMonth);

    var _dat = new Date(this.date);
    $('.info').text(getTimeStr(_dat));
    // this.setTit();
    this.tab_body.html('');
    this.createBody(_dat);
  }
}

function isObj (obj) {
  return toString.call(obj).slice(8, -1) === 'Object';
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