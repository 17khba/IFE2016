var obj = {
	onoff:true
};
;(function(){
	document.addEventListener("touchstart",function(ev){
		ev.preventDefault();
	},{
		passive:false
	});

	var now = new Date();
	var h = now.getHours();
	var m = now.getMinutes();
	var s = now.getSeconds();
	var str1 =add0(h)+":"+add0(m);
	var Month=now.getMonth()+1;//月
	var DateR=now.getDate();//日
	var Day=now.getDay();//周
	if(Day===0){
		Day=6;
	}else{
		Day=Day-1;
	}
	var arr=["一","二","三","四","五","六","日"]
	var mDD=Month+"月"+DateR+"日 "+"星期 "+arr[Day];
	$("#time_text").html(mDD);
	
	var uls=$(".time_ul");
	for (var i = 0; i < uls.length; i++) {
		if(i==2){
			uls.eq(i).find("li").html(":");
		}else{
			uls.eq(i).find("li").html(str1.charAt(i))//通过下标设置当前时间
		}
	}
	setInterval(function(){
		checkDiffer()
	},2000)
	
	function checkDiffer(){
		var now2 = new Date();
		var h2 = now2.getHours();
		var m2 = now2.getMinutes();
		var s2 = now2.getSeconds();
		
		var Month=now2.getMonth()+1;//月
		var DateR=now2.getDate();//日
		var Day=now2.getDay();//周
		var arr=["一","二","三","四","五","六","日"]
		if(Day===0){
			Day=6;
		}else{
			Day=Day-1;
		}
		var mDD=Month+"月"+DateR+"日 "+"星期 "+arr[Day];
		$("#time_text").html(mDD);
		
		var str2 = add0(h2)+":"+add0(m2);
		//传入两个时间值 然后返回不一样的值
		var differArr = check( str1,str2 );
		
		for(var i = 0;i<differArr.length;i++){
			//0是下标                                  1是即将要改变的值
			go( differArr[i][0],differArr[i][1] );
		}
		str1 = str2;
	}
	
	function check(a,b){
		var arr=[];
		//把不同的值push到arr里
		for (var i = 0; i < a.length; i++) {
			if(a.charAt(i) !=b.charAt(i)){
				arr.push([i,b.charAt(i)]);
			}
		}
		return arr;
	}
	
	function go(index,srcNum){
		//把变得的下标和更改的值传入并更改
		$(".time_ul").eq(index).find("li").css("-webkit-animation-play-state","running");
		$(".time_ul").eq(index).find("li").css("animation-play-state","running");
		setTimeout(function(){
			$(".time_ul").eq(index).find("li").html(srcNum);
		},500)
		setTimeout(function(){
			$(".time_ul").eq(index).find("li").css("-webkit-animation-play-state","paused");
			$(".time_ul").eq(index).find("li").css("animation-play-state","paused");
		},1000);
	}
	function add0(n){
			return n<10 ? "0"+n : ""+n
	}
	
//锁屏界面
	var hdX=0;
	var hdMX=0;
	var w=$("#shade1").width()/2;
	$("#clear_box").on("touchstart",function(ev){
		hdX=ev.changedTouches[0].pageX;
		return false;
	})
	$("#clear_box").on("touchmove",function(ev){
		hdMX=Math.floor(ev.changedTouches[0].pageX-hdX);
		$("#shade1").css("left",hdMX);
	})
	$("#clear_box").on("touchend",function(ev){
		if(hdMX>=w){
			$("#shade").hide();
			$("#shade1").hide();
		}else{
			$("#shade1").css("left","0");
		}
	})
	
//生成内部应用
	var str="";
	for (var i = 0; i < data1.length; i++) {
		str+="<div class='use' data-id="+i+"><img src="+data1[i]+" /><span>"+texts[i]+"</span></div>"
	}
	$("#use_box").html(str);
	 index=$(this).index();
	obj.onoff=true;
//	$(".use").on("touchstart",function(ev){
//		var index=$(this).index();
		if(index===0){
			if(obj.onoff){
				obj.onoff=false;
				vrAnTa();
			}
		}
		if(index===1){
			if(obj.onoff){
				obj.onoff=false;
				qqIndex();
			}
		}
//		if(index===2){
//			if(obj.onoff){
				obj.onoff=false;
				animationD();
//			}
//		}
		if(index===3){
			$(".use").eq(3).append("<div class='photoBox'></div>")
		}
//	});
})()

	

