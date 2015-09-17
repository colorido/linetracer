var sin = Array(361);
var cos	= Array(361);

function Car(x,y,angle) {

	this.x = x;
	this.y = y;
	this.angle = angle;
	this.radius = 15;
	this.status = 0;
	this.sinCenterFar = Array(361);
	this.cosCenterFar = Array(361);

	for(var i = 0; i <= 360; i++) {
		sin[i] = Math.sin(i*Math.PI/180);
		cos[i] = Math.cos(i*Math.PI/180);
	}

	
	for(var i = 0; i <= 360; i++) {
		this.sinCenterFar[i] = Math.round(sin[i]*this.radius);
		this.cosCenterFar[i] = Math.round(cos[i]*this.radius);
	}

	this.leftWheelX = x+this.cosCenterFar[(90+angle)%360];
	this.leftWheelY = y-this.sinCenterFar[(90+angle)%360];
	this.rightWheelX = x+this.cosCenterFar[(270+angle)%360];
	this.rightWheelY = y-this.sinCenterFar[(270+angle)%360];
	this.sensor3X = x+this.cosCenterFar[angle];
	this.sensor3Y = y-this.sinCenterFar[angle];
	this.sensor1X = x+this.cosCenterFar[(30+angle)%360];
	this.sensor1Y = y-this.sinCenterFar[(30+angle)%360];
	this.sensor5X = x+this.cosCenterFar[(330+angle)%360];
	this.sensor5Y = y-this.sinCenterFar[(330+angle)%360];
	this.sensor2X = x+this.cosCenterFar[(15+angle)%360];
	this.sensor2Y = y-this.sinCenterFar[(15+angle)%360];
	this.sensor4X = x+this.cosCenterFar[(345+angle)%360];
	this.sensor4Y = y-this.sinCenterFar[(345+angle)%360];

}

Car.prototype.move = function() {

	if(this.angle<0){

		this.angle = 360 + this.angle;
	}

	this.angle = this.angle % 360;

	switch(this.status) {

		case 12 :
			this.x += Math.round(cos[this.angle] * 5);
			this.y -= Math.round(sin[this.angle] * 5);
			break;

		case 14 :
			this.x -= Math.round(cos[this.angle] * 5);
			this.y += Math.round(sin[this.angle] * 5);
			break;

		case 16 :
			this.angle += 5;
			break;

		case 18 :
			this.angle -= 5;
			if(this.angle<0) this.angle = 360 + this.angle;
			break;

		case 20:
			this.angle += 5;
			this.x = this.leftWheelX + this.cosCenterFar[(this.angle+270)%360];
			this.y = this.leftWheelY - this.sinCenterFar[(this.angle+270)%360];
			break;

		case 22:
			this.angle -= 5;
			if(this.angle<0) this.angle = 360 + this.angle;
			this.x = this.leftWheelX + this.cosCenterFar[(this.angle+270)%360];
			this.y = this.leftWheelY - this.sinCenterFar[(this.angle+270)%360];
			break;

		case 24:
			this.angle += 5;
			this.x = this.rightWheelX + this.cosCenterFar[(this.angle+90)%360];
			this.y = this.rightWheelY - this.sinCenterFar[(this.angle+90)%360];
			break;

		case 26:
			this.angle -= 5;
			if(this.angle<0) this.angle = 360 + this.angle;
			this.x = this.rightWheelX + this.cosCenterFar[(this.angle+90)%360];
			this.y = this.rightWheelY - this.sinCenterFar[(this.angle+90)%360];
			break;

		default:
			return;

	}

	//左右の支点（タイヤ）は、再計算させるほどに小数点の切り上げによって座標がずれる。
	//困らない時もあるけど方向転換の操作（左右どちらかのタイヤを固定した）のときは
	//中心がずれることになるので固定にした方がよい。

	//もしかしたら普通の回転の時も同じことが起こっているのかも。

	//スピード（移動量）を大きくするとずれは目立たなくなる

	this.leftWheelX = this.x+this.cosCenterFar[(90+this.angle)%360];
	this.leftWheelY = this.y-this.sinCenterFar[(90+this.angle)%360];
	this.rightWheelX = this.x+this.cosCenterFar[(270+this.angle)%360];
	this.rightWheelY = this.y-this.sinCenterFar[(270+this.angle)%360];
	this.sensor3X = this.x+this.cosCenterFar[this.angle];
	this.sensor3Y = this.y-this.sinCenterFar[this.angle];
	this.sensor1X = this.x+this.cosCenterFar[(30+this.angle)%360];
	this.sensor1Y = this.y-this.sinCenterFar[(30+this.angle)%360];
	this.sensor5X = this.x+this.cosCenterFar[(330+this.angle)%360];
	this.sensor5Y = this.y-this.sinCenterFar[(330+this.angle)%360];
	this.sensor2X = this.x+this.cosCenterFar[(15+this.angle)%360];
	this.sensor2Y = this.y-this.sinCenterFar[(15+this.angle)%360];
	this.sensor4X = this.x+this.cosCenterFar[(345+this.angle)%360];
	this.sensor4Y = this.y-this.sinCenterFar[(345+this.angle)%360];
}