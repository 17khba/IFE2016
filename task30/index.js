var checkText = [
	{
		toolTip: '必填，长度为4~16位字符',
		empty: '输入不能为空',
		right: '名称可用'
	},
	{
		toolTip: '6到16位数字和字母',
		empty: '输入不能为空',
		right: '密码可用'
	},
	{
		toolTip: '请再次确认密码',
		empty: '输入不能为空',
		right: '两次输入一致'
	},
	{
		toolTip: 'example@haha.com',
		empty: '输入不能为空',
		right: '邮箱正确'
	},
	{
		toolTip: '请输入11位手机号码',
		empty: '输入不能为空',
		right: '手机格式正确'
	}
];

function addEvent( ele, event, fn ){
	if( ele.addEventListener ){
		ele.addEvnetListener( event, fn, false );
	} else if( ele.attachEvent ){
		ele.attachEvent( event, fn );
	} else{
		ele[ 'on' + event ] = fn;
	}
}