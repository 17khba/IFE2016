'use strict';

// import 'babel-polyfill';
/* 选择器方法*/
var $ = function $(selector) {
    return document.querySelector(selector);
};

/* 事件绑定兼容*/
var on = function on(ele, event, fn) {
    if (ele.addEventListener) {
        ele.addEventListener(event, fn, false);
    } else if (ele.attachEvent) {
        ele.attachEvent('on' + event, fn);
    } else {
        ele['on' + event] = fn;
    }
};

var tb = $('.tb').tBodies[0];
var txt = $('.txt');
var btn = $('.btn');

var direction = ['top', 'right', 'bottom', 'left'];

/* 获取当前元素*/
var getPos = function getPos(x, y) {
    return tb.rows[x].cells[y];
};

var setDiv = function setDiv(ele) {
    return ele.innerHTML = '<div></div>';
};
var clearDiv = function clearDiv(ele) {
    return ele.innerHTML = '';
};

/* 通过类名的方式调整方向*/
var setDir = function setDir(obj, direction) {
    return obj.className = direction;
};

/* 默认位置信息*/
var pos = {
    currentEle: getPos(5, 5), // 当前元素
    dir: 3, // 当前方向
    x: 5, // 当前行号
    y: 5 };

/* 调整默认方向*/
var changeDir = function changeDir(num) {
    pos.dir = (pos.dir + num < 0 ? 3 : pos.dir + 1) % 4;
    setDir(pos.currentEle, direction[pos.dir]);
};

/* 初始化*/
var init = function init(_currentEle) {
    setDir(pos.currentEle, '');
    clearDiv(pos.currentEle);
    setDir(_currentEle, direction[pos.dir]);
    setDiv(_currentEle);
    pos.currentEle = _currentEle;
};

var goPublic = function goPublic(str, num) {
    if (pos[str] <= 1) return;
    if (pos[str] > 1) pos[str] = pos[str] + num;
    var _currentEle = getPos(pos.x, pos.y);
    init(_currentEle);
};

var go = function go() {
    var _className = pos.currentEle.className;
    switch (_className) {
        case 'top':
            goPublic('x', -1);
            break;
        case 'right':
            goPublic('y', 1);
            break;
        case 'bottom':
            goPublic('y', 1);
            break;
        case 'left':
            goPublic('y', -1);
            break;
    }
};

var run = function run() {
    var txtVal = txt.value.trim().toLowerCase().replace(/\s/g, '');
    switch (txtVal) {
        case 'go':
            go();
            break;
        case 'tunlef':
            changeDir(1);
            break;
        case 'tunrig':
            changeDir(-1);
            break;
        case 'tunbak':
            changeDir(2);
            break;
        default:
            break;
    }
};

setDir(pos.currentEle, 'left');
setDiv(pos.currentEle);
on(btn, 'click', run);
//# sourceMappingURL=app.js.map