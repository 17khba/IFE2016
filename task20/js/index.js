var data = [];

/*获取元素*/
function $(ele){
	return /^\.[a-zA-Z]+$/.test(ele) ? document.querySelectorAll(ele) : document.querySelector(ele);
}

$('#insert').onclick = function(){
	var oValue, oTxt;
	oValue = $('#txt').value.trim();
	oTxt = oValue.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(item){
		if(item !== undefined && item.length > 0){
			return true;
		} else{
			return false;
		}
	});
	data = data.concat(oTxt);
	render();
};

$('#search').onclick = function(){
	var oValue = $('#search_txt').value.trim();
	render(oValue);
};

function render(str){

	$('#result').innerHTML = data.map(function(item){
		if(str !== undefined && str.length > 0){
			item = item.replace(new RegExp(str, 'g'), `<span>${str}</span>`)
		}
		return `<div>${item}</div>`;
	}).join('');
}