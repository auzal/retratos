
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

let totalImgNum = 0;
let loadImgNum = 0;
let loaded = false;
let initialized = false;
let forceMobile = false;

//***************************************************************

function preload(){

	debugFont = loadFont('assets/RobotoMono-ExtraLight.ttf');
	manager = new PortraitManager();


}

//***************************************************************

function setup() {

	bgColor = color(40);

	var canvasDiv = document.getElementById('sketchDiv');
	parentWidth = canvasDiv.clientWidth;
  parentHeight = canvasDiv.clientHeight;

	calibrateImages();

	//manager.init();

	var myCanvas = createCanvas(sketchWidth, sketchHeight);
  myCanvas.parent("sketchDiv");
	manager.addSimplePortrait('Edgar',26);
	manager.addTriplePortrait('Gustavo',16,16,17);
	manager.addSimplePortrait('Korangi',28);
	manager.addTriplePortrait('Zumak',16,16,15);



}

//***************************************************************

function draw() {
	background(bgColor);
	if(forceMobile){
		background(255,0,0);
	}
	if(loadImgNum === totalImgNum && !loaded){
		loaded = true;
		manager.init();
		initialized = true;
	}

	if(!loaded){
		renderLoading();
	}

	if(initialized){
		manager.render();
		manager.update();
	}
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
    let h = height * pixelDensity();
    print("window height -> " + h);
    let resFolder = "";
    if(h <= 850 ){
      resFolder = "850/";
    }else if( h <= 1500){
      resFolder = "1500/";
    }else{
      resFolder = "1920/";
    }

		if(isMobileDevice()){
			resFolder = "850/";
			forceMobile = true;
		}

    return resFolder;

  }

//***************************************************************

	function switchPortrait(id){
		manager.findById(id);
//		console.log(id);
    //doing custom things with myVal
    //here I want to prevent default
    return false;
}

//***************************************************************

function calibrateImages(){
	let imgWidth_max = parentWidth - (margin * 2);
	let imgHeight_max = parentHeight - (margin * 2);

	let initialImgWidth = 1334;
	let initialImgHeight = 1920;

	imgWidth = imgWidth_max;
	imgHeight = initialImgHeight * imgWidth/initialImgWidth;

	if (imgHeight > imgHeight_max) {
		imgHeight = imgHeight_max;
		imgWidth  = initialImgWidth * imgHeight/initialImgHeight;
	}

	sketchWidth = imgWidth + margin * 2;
	sketchHeight = imgHeight + margin * 2

	imgX = sketchWidth/2;
	imgY = sketchHeight/2;
}

//***************************************************************

function successLoad(){
	loadImgNum ++;
}

//***************************************************************

function failLoad(){

}

//***************************************************************

function renderLoading(){
	push();
	textAlign(CENTER, CENTER);
	textFont(debugFont);
	textSize(12);
	fill(255);
	text("Cargando imágenes",width/2, height/2);
	let rectW = width/4;
	stroke(255,30);
	strokeWeight(2);
	translate(width/2 - rectW/2, height/2 + 20);
	line(0,0,rectW,0);
	stroke(255);
	line(0,0,(loadImgNum/totalImgNum)*rectW,0);
	pop();
}

//***************************************************************

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};
