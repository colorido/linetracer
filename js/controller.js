var imgURL	= Array();
var btnState= 0;

function playbtn() {

    if(btnState == 1) {
		btnState = 0;
		stopTime();
	}else{
		btnState++;
		startTime();
	}

}

function fowardbtn() {


}

function changeTab(name) {
	document.getElementById('codetab').style.display ='none';
	document.getElementById('debugtab').style.display ='none';
	document.getElementById(name).style.display ='block';
	
}
function progStart() {

}