import 'babel-polyfill';
/* 选择器方法*/
const $ = selector => document.querySelector(selector);

/* 事件绑定兼容*/
const on = (ele, event, fn) => {
    if (ele.addEventListener) {
        ele.addEventListener(event, fn, false);
    } else if (ele.attachEvent) {
        ele.attachEvent(`on${event}`, fn);
    } else {
        ele[`on${event}`] = fn;
    }
};

const tb = $('.tb').tBodies[0];
const [txt, btn] = [$('.txt'), $('.btn')];
const direction = ['top', 'right', 'bottom', 'left'];

/* 获取当前元素*/
const getPos = (x, y) => tb.rows[x].cells[y];

const setDiv = ele =>  ele.innerHTML = `<div></div>`;
const clearDiv = ele => ele.innerHTML = '';

/* 通过类名的方式调整方向*/
const setDir = (obj, direction) => obj.className = direction;

/* 默认位置信息*/
const pos = {
    currentEle: getPos(5, 5),       // 当前元素
    dir: 3,                         // 当前方向
    x: 5,                           // 当前行号
    y: 5,                           // 当前列号
};

/* 调整默认方向*/
const changeDir = num => {
    pos.dir = (pos.dir + num < 0 ? 3 : pos.dir + 1) % 4;
    setDir(pos.currentEle, direction[pos.dir]);
};

/* 初始化*/
const init = _currentEle => {
    setDir(pos.currentEle, '');
    clearDiv(pos.currentEle);
    setDir(_currentEle, direction[pos.dir]);
    setDiv(_currentEle);
    pos.currentEle = _currentEle;
};

const goPublic = (str, num) => {
    if(pos[str] <= 1) return;
    if(pos[str] > 1) pos[str] = pos[str] + num;
    const _currentEle = getPos(pos.x, pos.y);
    init(_currentEle);
};

const go = () => {
    const _className = pos.currentEle.className;
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

const run = function () {
    const txtVal = txt.value.trim().toLowerCase().replace(/\s/, '');
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
