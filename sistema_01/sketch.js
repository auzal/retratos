
let bgColor;

let imgX;
let imgY;

let imgWidth;
let imgHeight;
let margin = 0;

let manager;

let parentWidth;
let parentHeight;

let sketchWidth;
let sketchHeight;

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

	bgColor = color(40);

	 var canvasDiv = document.getElementById('sketchDiv');
	 parentWidth = canvasDiv.clientWidth;
   parentHeight = canvasDiv.clientHeight;

	 	manager.init();

	 var myCanvas = createCanvas(sketchWidth, sketchHeight);
   myCanvas.parent("sketchDiv");



//	createCanvas(1000,1000);
//	var sketchCanvas = createCanvas(width,450);
//	console.log(sketchCanvas);
//	sketchCanvas.parent("myCanvas");

//	imageMode(CENTER);


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
//	resizeCanvas(windowWidth, windowHeight);
//	manager.calibrateImages();
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

function  checkResolution(){
    let h = windowHeight * pixelDensity();
    print("window height -> " + h);
    let resFolder = "";
    if(h <= 850 ){
      resFolder = "850/";
    }else if( h <= 1500){
      resFolder = "1500/";
    }else{
      resFolder = "1920/";
    }

    return resFolder;

  }

//***************************************************************

	function callmymethod(id){
		manager.findById(id);
//		console.log(id);
    //doing custom things with myVal
    //here I want to prevent default
    return false;
}
