function qqIndex(){
	$(".use").eq(1).append("</div><div class='qqBox'></div>");
				
	//登录面板
	$(".qqBox").append(strenter);
	$(".qqImg").css("background-image","url("+ico[0]+")");	
	
	//logon动画
	setTimeout(function(){
		var initilBg=document.querySelector(".initilBg");
		var logonOption=document.querySelector(".logonOption");
		MTween({
			el:initilBg,
			target:{scale:96},
			time:920,
			type:"linear"
		});
		$(".logonOption").animate({
					bottom:"10%"
			},{
				duration:1000
		});
	},1000);
	
	//logon1动画
	var spans=$(".logonOption").find("span");
	spans.eq(0).on("touchstart",function(){
		spans.eq(0).css("background-color","#eeedf2");
		$(".qqBox2").animate({
			marginLeft:"-100%"
		},400,function(){
			$(".textBox").animate({
				marginTop:"0%"
			},300,"linear");
		});
		return false;
	});
	spans.eq(0).on("touchend",function(){
		spans.eq(0).css("background-color","");
	});
	
	//同款条例
	var spans=$(".skewBox").find("span");
	var onffo=true;
	spans.eq(0).on("touchstart",function(){
		if(onffo){
			$(".subm").css("color","#fff")
			spans.eq(0).css("background-image","url(./img/yes.png)");
			spans.eq(0).css("border-color","rgba(0,0,0,0)");
			onffo=false;
		}else{
			$(".subm").css("color","#959595")
			spans.eq(0).css("background","");
			spans.eq(0).css("border-color","#959595");
			onffo=true;
		}
	});
	
	//弹框
	var tk="<div class='bouncedBox'></div><div class='shade'></div>";
	$(".logon1").append(tk)
	var bouncedTex="<h3>登录失败</h3><span></span><span>确定</span>"
	$(".bouncedBox").append(bouncedTex);
	
	//弹框2
	var tK2="<div class='bouncedBox2'><span class='tanK2'>i</span><span></span></div>";
	$(".logon1").append(tK2);
	
	//显示/隐藏 清空按钮
	var delet1=$(".inpu").find("span").eq(0);
	var delet2=$(".inpu").find("span").eq(1);
	$(".texts").on("input",function(){
		$(".texts").val()!==""? delet1.show():delet1.hide();
	});
	
	$(".pass").on("input",function(){
		$(".pass").val()!==""? delet2.show():delet2.hide();
	});
	
	//清除QQ登陆框内容
	$(".inpu").find("span").eq(0).on("touchstart",function(){
		$(".texts").val("");
		delet1.hide();
	})
	$(".inpu").find("span").eq(1).on("touchstart",function(){
		$(".pass").val("");
		delet2.hide();
	})
	
	//弹框1 确认功能
	$(".bouncedBox").find("span").eq(1).on("touchstart",function(){
		$(".shade").hide();
		$(".bouncedBox").hide();
	});
	
	//条款条例显示 隐藏
	var h=$(window).height();
    $(window).resize(function(){
        if($(window).height()<h){
            $('.skewBox').hide();
        }
        if($(window).height()>=h){
            $('.skewBox').show();
        }
    });
	
	//阻止冒泡
	document.querySelectorAll('input').forEach(function(obj){
	  obj.addEventListener('touchstart', function(ev) {
	    ev.stopPropagation();
	  }, false);
	});
	
	document.querySelectorAll('a').forEach(function(obj){
	  obj.addEventListener('touchstart', function(ev) {
	    ev.stopPropagation();
	  }, false);
	});
	
	//登录验证
	$(".subm").on("touchstart",function(){
		if(onffo){
			return;
		}
		var textVa=$(".texts").val();
		var passVa=$(".pass").val();
		
		var re=/^[1-9]\d{4,10}$/;
		var re1= /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/;
		var phone=/^[1][3578]\d{9}$/;
		var pass=/^[a-zA-Z0-9\w\x21-\x7e]{6,16}$/;
		var span2Text=$(".bouncedBox2").find("span").eq(1)
		if(textVa===""){
			$(".bouncedBox2").animate({
				top:"0"
			},400,function(){
				setTimeout(function(){
					$(".bouncedBox2").animate({
						top:"-50%"
					},500);
				},2000);
			});
			span2Text.html("请输入账号 。" );
			span2Text.css("color","#000");
			
		}else if(passVa===""){
			$(".bouncedBox2").animate({
				top:"0"
			},500,function(){
				setTimeout(function(){
					$(".bouncedBox2").animate({
						top:"-50%"
					},400);
				},2000);
			});
			span2Text.html("请输入密码 。" );
			span2Text.css("color","#000");
		}else if(textVa.match("@")){
			if(!re1.test(textVa)){
				$(".shade").css("top","0");
				$(".bouncedBox").show();
				$(".bouncedBox").find("span").eq(0).html("邮箱错误 , 请重新输入!");
			}else{
				console.log("邮箱登录");
				loading();
				setTimeout(function(){
					Jump();//跳转;
				},1000);
				
			}
		}else if(phone.test(textVa)){
				console.log("手机号登录");
				loading();
				setTimeout(function(){
					Jump();//跳转;
				},1000);
		}else if(!re.test(textVa)){
			$(".shade").show()
				$(".bouncedBox").show();
			$(".bouncedBox").find("span").eq(0).html("账号不存在, 请重新输入!");
		}else if(!pass.test(passVa)){
			$(".shade").show()
			$(".bouncedBox").show()
			$(".bouncedBox").find("span").eq(0).html("密码错误, 请重新输入!");
		}else{
			console.log("QQ登录");
			loading();
			setTimeout(function(){
				Jump();//跳转;
			},1000);
		}
	});
	
	//loading
	function loading(){
		var bouncedBox2=$('.bouncedBox2');
		bouncedBox2.css("background-color","#020202");
		bouncedBox2.css("text-align","center");
		bouncedBox2.html("<span class='loadinImg'></span><span>登录中...</sapn>");
		bouncedBox2.find("span").eq(1).css("color","#fff");
		bouncedBox2.css("top","0");
		var loadinImg=$('.loadinImg');
		loadinImg.css("-webkit-animation-play-state","running");
		loadinImg.css("animation-play-state","running");
	}
	
	//跳转
	function Jump(){
		$('.InterfaceBox').show();
		Occlusion();
		var bouncedBox2=$('.bouncedBox2');
		var loadinImg=$('.loadinImg');
		bouncedBox2.animate({
				top:"-50%"
		},400,function(){
			loadinImg.css("-webkit-animation-play-state","paused");
			loadinImg.css("animation-play-state","paused");
		});
	}

	//分组功能面板	  
	$(".qqBox").append(strenter2);
	$(".topT").find("span").eq(0).css("background-image","url("+ico[0]+")");

	//分组界面遮罩
	function Occlusion(){
		$('.Mask').animate({
			opacity:"0"
		},400,function(){
			$('.Mask').hide();
		})
	}
	
	//生成头部主类
	var fenZ="";
	for (var i = 0; i < iocF.length; i++) {
		fenZ+="<div class='lei'><img class ='leiImg' src='img/"+iocF[i]+"'/><span>"+ioctext[i]+"</span></div>"
	}
	$('.group').append(fenZ);
	
	//生成底部主类
	var bott="";
	for (var i = 0; i < bottomImg.length; i++) {
		bott+="<div class='lei'><img class ='leiImg' src='img/"+bottomImg[i]+"'/><span>"+bottomText[i]+"</span></div>"
	}
	$('.bottomB').append(bott);
	$('.bottomB').find("span").eq(1).css("color","#71d3f9");
	
	//特殊分组
	var special="";
	for (var i = 0; i < specialText.length; i++) {
		special+="<li><img src='img/"+offoImg[0]+"'/><p>"+specialText[i]+"</p><span>0/0</span></li>"
	}
	$('.specialBox').append(special);
	
	//生成普通分组
	var ordinary="";
	for (var i = 0; i < ordinaryText.length; i++) {
		ordinary+="<li><div class='title'><img src='img/"+offoImg[0]+"'/><p>"+ordinaryText[i]+"</p><span>0/1</span></div><div class='children'><span></span><p>"+naMe[i]+"</p></div></li>"
	}
	$('.ordinaryBox').append(ordinary);
	$('.children').find("span").css("background-image","url("+ico[0]+")");
	
	//设置面板区
	$('.information').css("background-image","url("+informationBG[0]+")");
	$('.portrait').css("background-image","url("+ico[0]+")");
	$('.nickname').html(nicknameText[0]);
	$('.vip').css("background-image","url("+ipvImg[0]+")");
	
	var spanS="";
	for (var i = 0; i < GradeImg.length; i++) {
		spanS+="<span class='Grade' style='background-image:url("+GradeImg[i]+")'></span>"
	}
	$('.styleDengj').append(spanS);
	$('.dataBox').find("p").html(explain[0]);
	var textH=$('.dataBox').find("p").html().substr(0,15)+'...';
	$('.dataBox').find("p").html(textH);
	
	//生成我的分类
	var lis="";
	for (var i = 0; i < mvIocImg.length; i++) {
		lis+="<li><span style='background-image:url("+mvIocImg[i]+")'></span><span>"+mvIocText[i]+"</span></li>";
	}
	$('.listBox').append(lis);
	
	var sue="";
	var sue2="<div class='sueZ'><strong class='sueT'>"+sueText[2]+"</strong></div>";
	for (var i = 0; i < sueImg.length; i++) {
		sue+="<div class='sueZ'><span style='background-image:url("+sueImg[i]+")'></span><span>"+sueText[i]+"</span></div>"
	}
	
	$('.valBottom').append(sue);
	$('.valBottom').append(sue2);
	
	//上下滑动事件
	var setY="";
	var getY=0;
	var setHdY;
	var setHdX;
	var lastTime=0;
	var lastY = 0;
	var lastDis=0;
	var lastTimeDis=0;
	var maxTranslate=0;	
	
	var Contacts=$('.Contacts');
	var Slide=document.getElementsByClassName('Contacts')[0];
	var setBox=document.getElementsByClassName('setBox')[0];
	var Grouping=document.getElementsByClassName('Grouping')[0];
	var Mask=document.getElementsByClassName('Mask')[0];
	var tBOnoff=false;
	Contacts.on("touchstart",function(ev){
		var parentH=document.getElementsByClassName('ContactsBox')[0].clientHeight;
		var childrenH=document.getElementsByClassName('Contacts')[0].clientHeight;
		maxTranslate=parentH-childrenH;
		setY=ev.changedTouches[0].pageY;
		getY=css(Slide,"translateY");
		
		lastY=getY;
		lastTime=new Date().getTime();				
	});
	var SlideS=true;//控制子级事件状态
	var updonw = false;
	var leftright = false;
	inits();
	function inits(){
		var x,y;
		$('.InterfaceBox').on('touchstart',function(ev){
			x = ev.changedTouches[0].pageX;
			y = ev.changedTouches[0].pageY;
		});
		$('.InterfaceBox').on('touchmove.a',function(ev){
			if($('.Mask').css("display") === "block	"){
				return;
			}
			updonw = false;
			leftright = false;
			var mx = ev.changedTouches[0].pageX - x;
			var my = ev.changedTouches[0].pageY - y;
			if(Math.abs(my)>5){
				console.log("上下");
				updonw = true;
				
				Contacts.trigger("CustomEvent123")
				$('.InterfaceBox').off('touchmove.a');
			}
			if(Math.abs(mx)>5){
				console.log("左右");
				leftright = true;
				leftRight();
				$('.InterfaceBox').off('touchmove.a');
			}
		});
	}
	
	Contacts.on("CustomEvent123",function(){
		Contacts.off('touchmove').on("touchmove",function(ev){
			console.log("leftright:"+leftright);
			if(leftright){
				return;
			}
			SlideS=false;
			
			var nowTime = new Date().getTime();
			var valueY="";
			ValueY=ev.changedTouches[0].pageY;
			
			var setValueY="";
			setValueY=ValueY-setY;
			
			setHdY="";
			setHdY=getY+setValueY;
			css(Slide,"translateY",setHdY);
			lastDis=setHdY-lastY;
			lastTimeDis=nowTime-lastTime;
			lastTime=nowTime;
		});
		Contacts.off('touchend').on("touchend",function(){
			SlideS=true;
			var type="easeOut";
			var speed=Math.round(lastDis/lastTimeDis*10);
			speed = lastTimeDis <= 0?0 :speed;
			var target = Math.round(speed*30 + css(Slide,"translateY"));
			if(target > 0){
				target = 0;
				type = "backOut";
			} else if(target < maxTranslate){
				target = maxTranslate;
				type = "backOut";
			}
			MTween({
				el:Slide,
				target:{translateY:target},
				time:Math.round(Math.abs(target - css(Slide,"translateY"))*1.8),
				type: type
			});
			console.log("ok");
			updonw = false;
			inits();
		});
	})

	//左右滑动事件
	//leftRight();
	function leftRight(){
		var setX="";
		var getX=0;
		var getX2=0;
		
		$('.InterfaceBox').off('touchstart').on("touchstart",function(ev){
			setX=ev.changedTouches[0].pageX;
			getX=css(Grouping,"left");
			getX2=css(setBox,"left");
		})
		$('.InterfaceBox').off('touchmove').on("touchmove",function(ev){
			console.log(updonw);
			if(updonw) return;
			ev.stopPropagation();
			var valueX="";
			valueX=ev.changedTouches[0].pageX;
			
			var setValueX="";
			setValueX=valueX-setX;
			
			setHdX="";
			setHdX=getX+setValueX;
			if(setHdX>10){
				$('.Mask').show();
				$('.Mask').css("opacity","0.6");
				css(Mask,"left",setHdX);
				css(Grouping,"left",setHdX);
			}else if(setHdX<50){
				css(Mask,"left",0);
				$('.Mask').css("opacity","0")
				css(Grouping,"left",0);
			}
			if(setHdX<150){
				$('.topT').css("background","#12b7f5");
				
			}else if(setHdX>150){
				$('.topT').css("background","#fff");
			}
			if(setHdX>=260){
				$('.Mask').css("left","85%");
				$('.Mask').css("opacity","0.6");
				$('.Grouping').css("left","85%");
			}
				
			return false;
		});
		
		$('.InterfaceBox').off('touchend').on("touchend",function(ev){
			if(setHdX<150){
				$('.Grouping').animate({
					left:"0"
				},100);
				$('.Mask').animate({
					left:"0"
				},100,function(){
					$('.Mask').hide();
					$('.Mask').css("opacity","0");
					if($('.Mask').css("display") === "none"){
						inits();
					}
				});
				
			}else if(setHdX>150){
				$('.Grouping').animate({
					left:"85%"
				},100)
				$('.Mask').animate({
					left:"85%",
					opacity:"0.6"
				},100);
			}
			leftright = false;
			//松手后没有回到初始位置
			
		});
		
	}
	//分组事件
	var lis=$('.ordinaryBox').find("li");
	for (var i = 0; i < lis.length; i++) {
		lis[i].onoff=true;
	}
	lis.on("touchend",function(){
		if(SlideS){
			if(this.onoff){
				$(this).find("img").attr("src","img/"+offoImg[1]+"");
				$(this).find("div").eq(1).show();
				this.onoff=false;
			}else{
				$(this).find("img").attr("src","img/"+offoImg[0]+"")
				$(this).find("div").eq(1).hide();
				this.onoff=true;
				
				//重新计算一遍高度
				var parentH=document.getElementsByClassName('ContactsBox')[0].clientHeight;
				var childrenH=document.getElementsByClassName('Contacts')[0].clientHeight;
				maxTranslate=parentH-childrenH;
				var type="easeOut";
				var speed=Math.round(lastDis/lastTimeDis*10);
				speed = lastTimeDis <= 0?0 :speed;
				var target = Math.round(speed*30 + css(Slide,"translateY"));
				if(target > 0){
					target = 0;
					type = "backOut";
				} else if(target < maxTranslate){
					target = maxTranslate;
					type = "backOut";
				}
				MTween({
					el:Slide,
					target:{translateY:target},
					time:Math.round(Math.abs(target - css(Slide,"translateY"))*1.8),
					type: type
				});
			}
		}
	}); 
}
