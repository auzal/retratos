let imgs = [];
let index;
let bg_color;

let img_width;
let img_height;
let margin = 30;

let movement_acum;

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


function preload(){
	let start = 50;
	for (let i=start; i < 103; i++) {
		let filename = 'assets/frame/frame-' + nf(i, 6, 0) + '.jpg';
    	imgs[i-start] = loadImage(filename); 
	}
	arrow = loadImage('assets/arrow.png');
}

function setup() {
	createCanvas(windowWidth,windowHeight);
	bg_color = color(229,221,214);
	resetImages();
	calibrateImages();
	imageMode(CENTER);
}

function draw() {
	background(bg_color);
 	if(millis() > 500){
 		image(imgs[index],width/2,height/2, img_width, img_height);
 	}

 	if(finished){
		if(millis() - time_at_finish > timeout_reset){
			resetImages();
		}
	}

	if(millis() - last_movement_time > arrow_timeout){
		if(!render_arrow){
			prepareArrow();
		}
		else{
			renderArrow();
		}
	}

}

function mouseDragged() {
	last_movement_time = millis();
	
	if(mouseY > height/2 - img_height/2 && mouseY < height/2 + img_height/2 ){
		if(pmouseY < mouseY){
			movement_acum += mouseY - pmouseY;
			movement_acum = constrain(movement_acum, 0, height);
		}	
		
		index = int(map(movement_acum,0,img_height,0,imgs.length-1));
		index = constrain(index, 0, imgs.length-1);
		if(index == imgs.length-1 ){
			if(!finished){
				finished = true;
				time_at_finish = millis();
			}
		}
	}
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

function resetImages(){

	index = 0;
	movement_acum = 0;
	finished = false;
	render_arrow = false;
	last_movement_time = millis();
}

function renderArrow(){

	let curr_time = millis() - arrow_travel_fire;

	if(curr_time > arrow_travel_time){
		hideArrow();
	}else{
		let lerp_amt = curr_time/(arrow_travel_time*1.0);
		arrow_y = lerp((height/2 - img_height/2) + img_height * .2, (height/2 - img_height/2) + img_height * .5, lerp_amt);
		if(lerp_amt < 0.5){
			arrowOpacity = map(lerp_amt, 0, 0.3, 0, 255);
		}else{
			arrowOpacity = map(lerp_amt, 0.7, 1, 255, 0);
		}
	}

	push();
	let len = windowHeight * 0.1;
	imageMode(CENTER);
	tint(255, arrowOpacity);
	image(arrow, width/2, arrow_y, len, arrow.height*len/arrow.width);
	pop();

}

function prepareArrow(){
	arrowOpacity = 128;
	render_arrow = true;
	arrow_travel_fire = millis();
}

function hideArrow(){
	render_arrow = false;
	last_movement_time = millis();
}

