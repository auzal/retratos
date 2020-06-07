let imgs = [];
let index;
let bg_color;

let img_width;
let img_height;
let margin = 30;

let movement_acum = 0;

let timeout_reset = 6000;
let time_at_finish = 0;
let finished;

let arrow_op = 255;
let arrow_y;
let render_arrow = false;


let arrow_timeout = 7000;
let last_movement_time = 0;
let arrow;

let arrow_travel_fire = 0;
let arrow_travel_time = 1000;


function preload(){
	let start = 1;
	for (let i=start; i < 40; i++) {
		let filename = 'assets/frame/' + i + '.jpg';
    	imgs[i-start] = loadImage(filename);
	}
	arrow = loadImage('assets/arrow.png');
}

function setup() {
	createCanvas(windowWidth,windowHeight);
	bg_color = color(229,221,214);
	index = 0;
	calibrateImages();
	imageMode(CENTER);
}

function draw() {
	background(bg_color);
 	if(millis() > 500){
 		image(imgs[index],width/2,height/2, img_width, img_height);
 	}
}

function mouseDragged() {
	// let y = mouseY;
	// if(y<0){
	// 	y = 0;
	// }else if(y>height){
	// 	y = height;
	// }


	movement_acum += mouseY - pmouseY;
	movement_acum = constrain(movement_acum, 0, height);


	index = int(map(movement_acum,0,img_height,0,imgs.length-1));
	index = constrain(index, 0, imgs.length-1);
}


function calibrateImages(){
	let img_width_max = width - (margin * 2);
	let img_height_max = height - (margin * 2);

	img_width = img_width_max;
	img_height = imgs[0].height * img_width/imgs[0].width;

	if (img_height > img_height_max) {
	    img_height = img_height_max;
	    img_width  = imgs[0].width * img_height/imgs[0].height;
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	calibrateImages();
}
