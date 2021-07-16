
let bgColor;

let imgX;
let imgY;

let imgWidth;
let imgHeight;
let margin = 30;

let manager;

//***************************************************************

function preload(){

	debugFont = loadFont('assets/mmr.ttf');
	manager = new PortraitManager();
	manager.addSimplePortrait('Edgar',26);
	manager.addTriplePortrait('Gustavo',16,16,17);
	manager.addSimplePortrait('Korangi',28);
	manager.addTriplePortrait('Zumak',16,16,15);

}

//***************************************************************

function setup() {
	createCanvas(windowWidth,windowHeight);
	bgColor = color(40);
	manager.init();
	noCursor();

	imageMode(CENTER);
}

//***************************************************************

function draw() {
	background(bgColor);
	manager.render();
	manager.update();
}

//***************************************************************

function mousePressed(){
	manager.pressed();
}

//***************************************************************

function mouseDragged() {
	manager.dragged();
}

//***************************************************************


function mouseReleased(){
	manager.released();
}

//***************************************************************

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	manager.calibrateImages();
//	calibrateImages();
}

//***************************************************************

function keyPressed(){
	if(key === 'D' || key === 'd' ){
		manager.renderDebug =! manager.renderDebug;
	}else if(key === 'R' || key === 'r' ){
		manager.reset();
	}

	if(keyCode === RIGHT_ARROW){
		manager.next();
	}else if(keyCode === LEFT_ARROW){
		manager.previous();
	}

}

//***************************************************************
