function animationD(){
	$(".use").eq(2).append("<div class='animatiBox'></div>");
		diYiP();
	function diYiP(){
		var animati="<div class='Modular'></div>"
		$('.animatiBox').append(animati);
		//生成第一个bg
		var str="";
		var bg1=animation.bg;
		str+="<ul class='bgBox'>";
			for (var i = 0; i < bg1.length; i++) {
				str+="<li class='bg"+(i+1)+"Box'>";
				str+="<img src='"+bg1[i]+"'/>";
				str+="</li>";
			}
		str+="</ul>";
		$('.Modular').append(str);
		
		//生成倒计时
		var time1=animation.time;
		$('.Modular').append("<ul class='time'></ul>");
		var timeHtml="";
		for (var i = 0; i < time1.length; i++) {
			timeHtml+="<li class='timeSpan'><img src='"+time1[i]+"' /></li>";
		}
		$(".time").append(timeHtml);
		var timeSpan=document.getElementsByClassName("timeSpan");
		var time=document.querySelector(".time");
		
		$('.timeSpan').eq(0).show();
		TweenMax.staggerFrom(".time", 1, {scale:0.5, opacity:0,  ease:Elastic.easeOut});
		var num=0;
		var timeVal=setInterval(function(){
			++num;
			if(num===2){
				clearInterval(timeVal);
			}
			for (var i = 0; i < timeSpan.length; i++) {
				$('.timeSpan').hide();
			}
			TweenMax.staggerFrom(".time", 1, {scale:0.5, opacity:0,  ease:Elastic.easeOut});
			$('.timeSpan').eq(num).show();
		},1000);
		
		//爆炸效果出场
//		setTimeout(function(){
//			yanc();
//		},3000);
		yanc();
		function yanc(){
			$(".bg5Box").hide();
			$(".time").hide();
			//碎片
			var shuiP="";
			var fragment1=animation.fragment;
			shuiP+="<ul class='burstBox'>";
				for (var i = 0; i < fragment1.length; i++) {
					shuiP+="<li class='burst"+(i+1)+"Box'>";
					shuiP+="<img src='"+fragment1[i]+"'/>";
					shuiP+="</li>";
				}
			shuiP+="</ul>";
			$('.Modular').append(shuiP);
			TweenMax.staggerFrom(".burstBox", 1, {scale:0.5, opacity:0, delay:0.2, ease:Elastic.easeOut});
			
			//地球
			var earth1=animation.earth;
			$('.Modular').append("<div class='nameEarth'><img src='"+earth1[0]+"'/></div>");
			var nameEarth1=document.querySelector(".nameEarth");
			css(nameEarth1,"scale",0.6);
			MTween({
				el:nameEarth1,
				target:{scale:108},
				time:500,
				type:"linear"
			});
			
			//第一屏主题登场
			var title1=animation.title1;
			var title2=animation.title;
			var titleHtml="";
			titleHtml+="<div class='titeBox'>";
			for (var i = 0; i < title1.length; i++) {
				titleHtml+="<div class='tite"+(i+1)+"Box'><img src='"+title1[i]+"'></div>";
			};
			titleHtml+="<ul class='textImg'>";
			for (var i = 0; i < title2.length; i++) {
				if(i===2){
					titleHtml+="<li class='tite"+(i+3)+"Box'><span>"+title2[i]+"</span></li>";
				}else{
					titleHtml+="<li class='tite"+(i+3)+"Box'><img src='"+title2[i]+"'></li>";
				};
			};
			titleHtml+="</ul>";
			titleHtml+="</div>";
			
			$('.Modular').append(titleHtml);
			TweenMax.staggerFrom(".tite1Box", 0.8, {y:-200, scale:0.5, opacity:0, delay:1, ease:Elastic.easeOut});
			TweenMax.staggerFrom(".tite2Box", 0.8, {y:-200, scale:0.5, opacity:0, delay:1, ease:Elastic.easeOut});
			TweenMax.staggerFrom(".textImg", 0.8, {y:800, scale:0.5, opacity:0, delay:1, ease:Elastic.easeOut});
			TweenMax.staggerFrom(".tite5Box", 1, {y:-80, scale:0.8, opacity:0, delay:1.8, ease:Elastic.liner});
			var burstBox=document.querySelector(".burstBox");
			css(burstBox,"opacity",100);
			MTween({
				el:burstBox,
				target:{opacity:0},
				time:2000,
				type:"linear"
			});
			setTimeout(function(){
				$(".tite6Box").css("-webkit-animation-play-state","running");
			},2500)
		}
		$('.Modular').eq(0).show();
	}
}
