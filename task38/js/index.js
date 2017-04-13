function RenderTab(head, body, dataObj) {
  this._head = head;
  this._body = body;
  this._tit = dataObj.tit;
  this._data = dataObj.data;

  this.init();
}

RenderTab.prototype = {
  constructor: RenderTab,
  init: function () {
    this.initHead();
    this.initBody();
  },
  initHead: function() {
    var self = this;

    var thead = createTh(this._tit);
    this._head.innerHTML = thead;

    this.addSortEle();

    function createTh(data) {
      var item = '<tr>';
      for (var i = 0; i < self._tit.length; i++) {
        item += `<th>${data[i]}</th>`;
      }
      item += '</tr>';
      return item;
    }

  },
  initBody: function () {
    var self = this;

    var tbody = (function(data) {
      var item = '';
      for (var i = 0; i < self._data.length; i++) {
        item += createTd(data[i]);
      }
      return item;
    })(this._data);
    this._body.innerHTML = tbody;

    function createTd(data) {
      var item = '<tr>';
      for (var i = 0; i < self._tit.length; i++) {
        if (i === 0) {
          item += `<td>${data.name}</td>`;
          continue;
        }
        item += `<td>${data.value[i-1]}</td>`;
      }
      item += '</tr>';
      return item;
    }
  },
  addSortEle: function () {
    var self = this;

    function addArrow (index) {
      var oDiv = createEle('div');
      var oSpan;
      for (var i = 0; i < 2; i++) {
        oSpan = createEle('span');
        i ? oSpan.className = 'arrow arrow_top' : oSpan.className = 'arrow arrow_bot';
        oDiv.appendChild(oSpan);
      }
      $('.tab').tHead.rows[0].cells[index].appendChild(oDiv);

      addEvent(oDiv.children[0], 'click', function () {
        self._data.sort(function (a, b) {
          return a.value[index - 1] - b.value[index - 1];
        });
        self.initBody();
      })

      addEvent(oDiv.children[1], 'click', function () {
        self._data.sort(function (a, b) {
          return -(a.value[index - 1] - b.value[index - 1]);
        });
        self.initBody();
      })
    }

    for (var i = 0; i < this._tit.length; i++) {
      if (i === 0) continue;
      addArrow(i);
    }
  }
}