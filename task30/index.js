var checkText = [
	{
		toolTip: '必填，长度为4~16位字符',
		wrong: '名称格式有误',
		right: '名称可用',
		ispassed: false
	},
	{
		toolTip: '6到16位数字和字母',
		wrong: '密码格式有误',
		right: '密码可用',
		ispassed: false
	},
	{
		toolTip: '请再次确认密码',
		wrong: '密码格式有误',
		right: '两次输入一致',
		ispassed: false
	},
	{
		toolTip: 'example@haha.com',
		wrong: '邮箱格式有误',
		right: '邮箱正确',
		ispassed: false
	},
	{
		toolTip: '请输入11位手机号码',
		wrong: '手机号格式有误',
		right: '手机格式正确',
		ispassed: false
	}
];

var labs, oSub;
labs = document.querySelectorAll( 'label' );
oSub = document.querySelector( '#sub' );

[].forEach.call( labs, function( item ){
	var id, oInp, tooltip, val;
	id = item.className.slice( 4 ) - 1;
	oInp = item.querySelector( 'input' );		//对应的输入框
	tooltip = isNode( item.nextSibling );		//对应的提示元素
	val = oInp.value;							//对应输入框的内容

	addEvent( oInp, 'focus', function(){

		tooltip.style.cssText = 'display: block; color: #ccc;';
		tooltip.textContent = checkText[ id ].toolTip;

	} );

	addEvent( oInp, 'blur', function(){

		regValue( id, item );

	} );
} );


addEvent( oSub, 'click', function( ev ){

	var e, isPass;
	e = ev || event;
	isPass = false;

	e.preventDefault();

	[0, 1, 2, 3, 4].forEach( function( item ){
		var lab = labs[ item ];
		regValue( item, lab );
	} );

	for (var i = 0; i < checkText.length; i++) {
		if( !checkText[i].isPassed ){
			isPass = false;
			break;
		}
		isPass = true;
	}

	if( isPass ){
		alert( '测试通过' );
	} else{
		alert( '测试失败' );
	}

} );

/**
 * [regValue 验证规则]
 * @param  {[num]} id   [对应的index值]
 * @param  {[obj]} item [对应的input]
 */
function regValue( id, item ){
	var pass, oInp, tooltip, val;
	pass = false;
	oInp = item.querySelector( 'input' );
	tooltip = isNode( item.nextSibling );
	val = oInp.value;
	switch( id ){
		case 0:
			pass = /^\w{4,16}$/.test( val.replace( /[\u0391-\uFFE5]/g, 'nn' ) );
			break;
		case 1:
			pass = /^\S{4,16}$/.test( val );
			break;
		case 2:
			pass = !val ? false : ( document.querySelector( '#pw' ).value == val );
			break;
		case 3:
			pass = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test( val );
			break;
		case 4:
			pass = /^[1][0-9]{10}$/.test( val );
			break;
	}
	if( pass ){
		oInp.style.borderColor = 'green';
		tooltip.style.color = 'green';
		tooltip.textContent = checkText[ id ].right;
		checkText[ id ].isPassed = true;
	} else{
		oInp.style.borderColor = 'red';
		tooltip.style.color = 'red';
		tooltip.textContent = checkText[ id ].wrong;
		checkText[ id ].isPassed = false;
	}
 
}

/**
 * [addEvent 事件绑定兼容]
 * @param {[obj]}   ele   [description]
 * @param {[string]}   event [description]
 * @param {Function} fn    [description]
 */
function addEvent( ele, event, fn ){
	if( ele.addEventListener ){
		ele.addEventListener( event, fn, false );
	} else if( ele.attachEvent ){
		ele.attachEvent( event, fn );
	} else{
		ele[ 'on' + event ] = fn;
	}
}

/*兼容nextSibling方法，返回节点元素*/
function isNode( ele ){
	while( ele.nodeType !== 1 ) ele = ele.nextSibling;
	return ele;
}