var imageData;
var fgCtx;
var canvasWidth		= 700;
var canvasHeight	= 500;
var drawSpeed = 60;
var setTime;
var car;
var carWidth;
var carheight;
var carImg;
var radius = 90;
var variant = Array();

function init() {

	var bg = document.getElementById('background');
	var bgCtx = bg.getContext('2d');

	var bgImg		= new Image();
	bgImg.src		= "img/course.png";

	bgImg.onload = function () {
		bgCtx.drawImage(bgImg,0,0,700,500);
		imageData = getImageData(bgCtx,700,500);
	}

	var fg = document.getElementById('foreground');
	fgCtx = fg.getContext('2d');

	carImg 			= new Image();
	carImg.src		= "img/car.png";

	car = new Car(500,420,180);

	carImg.onload = function() {
		redraw();
	}

}

function startTime() {
	setTime = setInterval(redraw,drawSpeed);
}

function stopTime() {
	clearInterval(setTime);
}

function getImageData (context,width,height) {

	var imageData = context.getImageData(0,0,width,height);
	var bufArray = Array();

	for (var i = 0; i < width; i++) {
		bufArray[i] = Array(height);
	}

	for (var i = 0; i < width * height; i++) {

		if(imageData.data[i*4] <= 1 && imageData.data[i*4+1] <= 1 && imageData.data[i*4+2] <= 1) {
			bufArray[i%width][Math.floor(i/width)] = 0;
		}else{
			bufArray[i%width][Math.floor(i/width)] = 1;
		}
	}

	return bufArray;

}

function redraw() {

	fgCtx.clearRect(0,0,700,500);

fgCtx.save();

var x = car.x -18;
var y = car.y -18;
var width = 36;
var height = 36;

fgCtx.setTransform(1, 0, 0, 1, 0, 0);

fgCtx.translate(x + width * 0.5, y + height * 0.5);

var angleInRadians = -car.angle * Math.PI / 180;
fgCtx.rotate(angleInRadians);

fgCtx.drawImage(carImg, width * -0.5, height * -0.5, 36, 36);

fgCtx.restore();

	fgCtx.fillStyle = "rgb(0, 0, 0)";
//	fgCtx.fillRect(car.x,car.y,2,2);
//	fgCtx.fillRect(car.leftWheelX,car.leftWheelY, 2,2);
//	fgCtx.fillRect(car.rightWheelX,car.rightWheelY,2,2);

	if(imageData[car.sensor3X][car.sensor3Y] == 0) {
		fgCtx.fillStyle = "rgb(200, 0, 0)";
		fgCtx.fillRect(car.sensor3X,car.sensor3Y,2, 2);
	}else{
		fgCtx.fillStyle = "rgb(0, 0, 0)";
		fgCtx.fillRect(car.sensor3X,car.sensor3Y,2, 2);
	}

	if(imageData[car.sensor1X][car.sensor1Y] == 0) {
		fgCtx.fillStyle = "rgb(200, 0, 0)";
		fgCtx.fillRect(car.sensor1X,car.sensor1Y,2, 2);
	}else{
		fgCtx.fillStyle = "rgb(0, 0, 0)";
		fgCtx.fillRect(car.sensor1X,car.sensor1Y,2, 2);
	}

	if(imageData[car.sensor2X][car.sensor2Y] == 0) {
		fgCtx.fillStyle = "rgb(200, 0, 0)";
		fgCtx.fillRect(car.sensor2X,car.sensor2Y,2, 2);
	}else{
		fgCtx.fillStyle = "rgb(0, 0, 0)";
		fgCtx.fillRect(car.sensor2X,car.sensor2Y,2, 2);
	}

	if(imageData[car.sensor5X][car.sensor5Y] == 0) {
		fgCtx.fillStyle = "rgb(200, 0, 0)";
		fgCtx.fillRect(car.sensor5X,car.sensor5Y,2, 2);
	}else{
		fgCtx.fillStyle = "rgb(0, 0, 0)";
		fgCtx.fillRect(car.sensor5X,car.sensor5Y,2, 2);
	}

	if(imageData[car.sensor4X][car.sensor4Y] == 0) {
		fgCtx.fillStyle = "rgb(200, 0, 0)";
		fgCtx.fillRect(car.sensor4X,car.sensor4Y,2, 2);
	}else{
		fgCtx.fillStyle = "rgb(0, 0, 0)";
		fgCtx.fillRect(car.sensor4X,car.sensor4Y,2, 2);
	}

	car.move();

	variant["sensor1"] = imageData[car.sensor1X][car.sensor1Y];
	variant["sensor2"] = imageData[car.sensor2X][car.sensor2Y];
	variant["sensor3"] = imageData[car.sensor3X][car.sensor3Y];
	variant["sensor4"] = imageData[car.sensor4X][car.sensor4Y];
	variant["sensor5"] = imageData[car.sensor5X][car.sensor5Y];

}