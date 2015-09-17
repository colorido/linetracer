var exit = false;
var codes = Array();
var loopcode;
var loopF = 0;
var lootTime;
var reservedName = [""];
var ope		= ["+","-","*","/","==","<=",">=",">","<"];
var variant = Array();

variant["FORWARD"]	= 12;
variant["BACK"]		= 14;
variant["R-FORWARD"]= 20;
variant["L-FORWARD"]= 26;
variant["R-BACK"]	= 22;
variant["L-BACK"]	= 24;
variant["R-TURN"]	= 16;
variant["L-TURN"]	= 18;
variant["STOP"]		= 9;

function progRun () {

	exit = false;

	codes = caveStr(document.form.codingscreen.value);

	parse();
	stopTime();
	startTime();
}

function caveStr(code) {

	bufArray = Array();
	str = " ";
	str += code;
	index = -1;

	for(var i = 1; i < str.length; i++) {

		if(str.charAt(i) == " " || str.charAt(i) == "\n") {
			continue;
		}else if(str.charAt(i-1) == " " || str.charAt(i-1) == "\n"){
			index++;
			bufArray[index] = str.charAt(i);
		}else{
			bufArray[index] += str.charAt(i);
		}
	}

	bufArray.push("EOF");

	return bufArray;
}

function parse() {

	term = codes.shift();

	if(term == "EOF") exit = true;

	if(exit) return;

	if(term == "move") {
		checkNum = parse();
		if(isNaN(checkNum)) {
			alert("引数に誤りがあります");
			exit = true;
			return 0;
		}else{
			car.status = checkNum;
			parse();
			return 1;
		}
	}

	if(term == "alert") {
		alert("call");
		parse();
		return "test2";
	}

	if(term == "if") {
		var checkTerm = parse();
		if(checkTerm == true || checkTerm == 1) {
			parse();
			return 12;
		}else{
			while(true){
				edCh = codes.shift();
				if(edCh == "end") break;
			}
			parse();
			return 14;
		}
	}

	if(term == "end") {
		parse();
		return 0;
	}


	if(term == "loop") {
		
		loopcode = loopCave(codes);

		loopTime = setInterval(function(){
			
			codes = Array();

			for(var i = 0; i < loopcode.length; i++) {
				codes[i] = loopcode[i];
			}

			exit  = false;

			parse();
		},10);

		
		return;

	}

	if(isNaN(term)) {

		var nm1 = variant[term];

		if((ope.indexOf(codes[0]) != -1)) {
			return calc(codes.shift(),nm1,parse());
		}else if(codes[0] == "="){
			codes.shift();
			variant[term] = parse();
		}else{
			return nm1;
		}

	}else{

		var nm1 = parseFloat(term);

		if((ope.indexOf(codes[0]) != -1)) {
			return calc(codes.shift(),nm1,parse());
		}else{
			return nm1;
		}

	}

}

function calc(ope,num1,num2) {

	switch(ope) {
		case "==" :
			return num1 == num2;
		case "<=" :
			return num1 <= num2;
		case ">=" :
			return num1 >= num2;
		case "+" :
			return num1 + num2;
		case "-" :
			return num1 - num2;
		case "*" :
			return num1 * num2;
		case "/" :
			return num1 / num2;
		default :
			return false;
	}
}

function loopCave(loopCode) {

	var bufArray = Array();
	var ifCount  = 0;
	var loopt;

	while(true) {
		loopt = loopCode.shift();

		if(loopt == "if")  ifCount++;
		if(loopt == "end") ifCount--;
		if(ifCount == -1) break;

		bufArray.push(loopt);
	}

	bufArray.push("EOF");

	return bufArray;

}

function progRes(){

	init();
	stopTime();
	clearInterval(loopTime);

}