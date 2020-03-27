let imgs = [];
let index;
let bg_color;

let img_width;
let img_height;
let margin = 30;

let movement_acum = 0;


function preload(){
let start = 50;
for (let i=start; i < 103; i++) {
	let filename = 'assets/frame/frame-' + nf(i, 6, 0) + '.jpg';
    imgs[i-start] = loadImage(filename); 
  }
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

