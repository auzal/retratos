let imgsA = [];
let imgsB = [];
let indexA;
let indexB;
let bg_color;

let img_width;
let img_height;
let margin = 30;

let movement_acum = 0;

let timeout_reset = 6000;
let time_at_finish = 0;
let finished;

let arrowOpacity = 255;
let arrow_y;
let render_arrow = false;


let arrow_timeout = 7000;
let last_movement_time = 0;
let arrow;

let arrow_travel_fire = 0;
let arrow_travel_time = 1000;

let alternate = false;

function preload(){

	let h = windowHeight;
	let resFolder = "";
	if(h <= 850 ){
		resFolder = "850pix/";
	}else if( h <= 1500){
		resFolder = "1500pix/";
	}else{
		resFolder = "1920pix/";
	}

	console.log("loading from dir ->" + resFolder);
	let start = 1;
	let end = 12;
	for (let i=start; i <= end; i++) {
		let filename = 'assets/frame/Gustavo/' + resFolder  + nf(i,2,0) + '.jpg';
//		console.log(filename);
		imgsA[i-start] = loadImage(filename);
	}

	 start = 1;
	 end = 10;
	for (let i=start; i <= end; i++) {
		let filename = 'assets/frame/Korangi/' + resFolder  + nf(i,2,0) + '.jpg';
//		console.log(filename);
		imgsB[i-start] = loadImage(filename);
	}

	arrow = loadImage('assets/arrow.png');
}

function setup() {
	createCanvas(windowWidth,windowHeight);
	bg_color = color(229,221,214);
	indexA = 0;
	indexB = 0;
	calibrateImages();
	imageMode(CENTER);
}

function draw() {
	background(bg_color);
	if(!alternate){
		if(millis() > 500){
			image(imgsA[indexA],width/2,height/2, img_width, img_height);
		}
	}else{
		if(millis() > 500){
			image(imgsB[indexB],width/2,height/2, img_width, img_height);
		}
	}
}

function mouseDragged() {
	movement_acum += mouseY - pmouseY;
	movement_acum = constrain(movement_acum, 0, height);


	indexA = int(map(movement_acum,0,img_height,0,imgsA.length-1));
	indexA = constrain(indexA, 0, imgsA.length-1);

	indexB = int(map(movement_acum,0,img_height,0,imgsB.length-1));
	indexB = constrain(indexB, 0, imgsB.length-1);
}


function calibrateImages(){
	let img_width_max = width - (margin * 2);
	let img_height_max = height - (margin * 2);

	img_width = img_width_max;
	img_height = imgsA[0].height * img_width/imgsA[0].width;

	if (img_height > img_height_max) {
		img_height = img_height_max;
		img_width  = imgsA[0].width * img_height/imgsA[0].height;
	}
	console.log("imageHeight -> " + img_height);
}


function keyPressed(){
	alternate = ! alternate;
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	calibrateImages();
}
