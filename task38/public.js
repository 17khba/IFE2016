function $ (name) {
  return document.querySelector(name);
}

function $$ (name) {
  return document.querySelectorAll(name);
}

function createEle (tagName) {
  return document.createElement(tagName);
}

function addEvent (el, event, fn) {
  if (el.addEventListener) {
    el.addEventListener(event, fn, false);
  } else if (el.attachEvent) {
    el.attachEvent('on' + event, fn);
  } else {
    el['on' + event] = fn;
  }
}

function removeEvent (el, event, fn) {
  if (el.removeEventListener) {
    el.removeEventListener(event, fn, false);
  } else if (el.detachEvent) {
    el.detachEvent('on' + event, fn);
  } else {
    el['on' + event] = fn;
  }
}