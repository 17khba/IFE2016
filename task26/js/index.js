var oPlant, screenWidth, screenHeight, screenCenterX, screenCenterY, planetRadiu, currentX, currentY, oImg, planteCount;

screenWidth = 800;						//画布宽度
screenHeight = 800;						//画布高度
planetRadiu = 50;						//圆半径
screenCenterX = 800 / 2;				//中心x
screenCenterY = 800 / 2;				//中心y
currentX = screenCenterX - 50;			//350
currentY = screenCenterY - 50;			//350
planteCount = 4;						//飞机个数						

/**
 * [drawPlanet 画行星]
 * @param  {[obj]} ctx [canvas目标画布]
 */
var drawPlanet = function ( ctx ){

	oImg = new Image();

	oImg.onload = function (){

		ctx.drawImage( oImg, currentX, currentY, planetRadiu * 2, planetRadiu * 2 );
	};

	oImg.src = 'img/oreo.png';

};

/**
 * [drawOrbit 画飞船轨道]
 * @param  {[obj]} ctx [canvas目标画布]
 */
var drawOrbit = function ( ctx ){

	for (var i = 0; i < planteCount; i++) {
		
		ctx.strokeStyle = '#999';
		ctx.beginPath();
		ctx.arc( screenCenterX, screenCenterY, 100 + 50 * i, 0, 2 * Math.PI );
		ctx.closePath();
		ctx.stroke();

	}

};

try{

	(function(){

		oPlant = document.querySelector('.plant');
		oPlant.width = screenWidth;
		oPlant.height = screenHeight;
		ctx = oPlant.getContext( '2d' );

		ctx.clearRect( 0, 0, screenWidth, screenHeight );

		drawPlanet( ctx );

		drawOrbit( ctx );
		
	})();

} catch( e ){

	throw new Error('您的浏览器不支持Canvas！');

}
