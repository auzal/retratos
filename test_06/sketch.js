let imgs_center = [];
let imgs_left = [];
let imgs_right = [];
let index_center = 0;
let index_right = 0;
let index_left = 0;

let bg_color;

let img_x;
let img_y;

let cursor_position = [];
let curr_section = 'first';

let img_width;
let img_height;
let margin = 30;

let movement_acum_center = 0;
let movement_acum_left = 0;
let movement_acum_right = 0;
let left_active = false;
let right_active = false;
let center_active = false;

let timeout_reset = 5000;
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
let waiting_for_click = true;
let waiting_for_drag = true;
let render_debug = false;
let debug_font;

let drag_direction = '';

let returning = false;

let return_frame_time = 50;
let return_fire_time = 0;

//***************************************************************

function preload(){

	for (let i=0; i < 18; i++) {
		let filename = 'assets/frame/center/center_' +nf(i+1,2) + '.jpg';
		imgs_center[i] = loadImage(filename);
	}

	for (let i=0; i < 19; i++) {
		let filename = 'assets/frame/left/left_' +nf(i+1,2) + '.jpg';
		imgs_left[i] = loadImage(filename);
	}

	for (let i=0; i < 17; i++) {
		let filename = 'assets/frame/right/right_' +nf(i+1,2) + '.jpg';
		imgs_right[i] = loadImage(filename);
	}
	arrow = loadImage('assets/arrow.png');
	cursor_position.push(createVector(0.1,0));
	cursor_position.push(createVector(0.5,0));
	cursor_position.push(createVector(0.9,0));
	debug_font = loadFont('assets/mmr.ttf');
}

//***************************************************************

function setup() {
	createCanvas(windowWidth,windowHeight);
	bg_color = color(242, 228, 227);
	index = 0;
	calibrateImages();
	imageMode(CENTER);
}

//***************************************************************

function draw() {
	background(bg_color);
	if(millis() > 500){
		imageMode(CENTER);
		if(curr_section === 'first'){
			image(imgs_center[index_center],img_x,img_y, img_width, img_height);
		}else 	if(curr_section === 'second'){
			image(imgs_left[index_left],img_x-(img_width/4),img_y, img_width/2, img_height);
			image(imgs_right[index_right],img_x+(img_width/4),img_y, img_width/2, img_height);
		}

	}

	handleReturn();

	if(render_debug){
		fill(88,175,209);
		noStroke();
		renderDebug();
	}

	//	console.log(curr_section);
}

//***************************************************************

function mousePressed(){
	waiting_for_click = false;
	returning = false;

	if(curr_section === 'first'){
		left_active = false;
		right_active = false;
		if(mouseX < width/2 + img_width/2 && mouseX > width/2  - img_width/2){
			center_active = true;
		}
	}else if(curr_section === 'second'){

		if(mouseX < width/2 && mouseX > width/2  - img_width/2){
			left_active = true;
			right_active = false;

		}else if (mouseX > width/2 && mouseX < width/2 + img_width/2){
			left_active = false;
			right_active = true;
		}

	}
}

//***************************************************************

function mouseDragged() {

	if(!waiting_for_click){
		drag_direction = '';
		if(pmouseY > mouseY){
			drag_direction = 'UP';
		}else if(pmouseY < mouseY){
			drag_direction = 'DOWN';
		}
		if(drag_direction === 'DOWN'){
			if(curr_section === 'first' && center_active){
				movement_acum_center += mouseY - pmouseY;
				movement_acum_center = constrain(movement_acum_center, 0, img_height);
				index_center = int(map(movement_acum_center,0,img_height,0,imgs_center.length-1));
				index_center = constrain(index_center, 0, imgs_center.length-1);
				if(index_center === imgs_center.length-1){
					curr_section = 'second';
					movement_acum_left = 0;
					movement_acum_right = 0;
				}
			}else if(curr_section === 'second'){
				if(left_active){
					movement_acum_left += mouseY - pmouseY;
					movement_acum_left = constrain(movement_acum_left, 0, img_height);
					index_left = int(map(movement_acum_left,0,img_height,0,imgs_left.length-1));
					index_left = constrain(index_left, 0, imgs_left.length-1);
				} else 	if(right_active){
					movement_acum_right += mouseY - pmouseY;
					movement_acum_right = constrain(movement_acum_right, 0, img_height);
					index_right = int(map(movement_acum_right,0,img_height,0,imgs_right.length-1));
					index_right = constrain(index_right, 0, imgs_right.length-1);
				}
			}
		}
	}
}

//***************************************************************

function handleReturn(){

	if(millis() - last_movement_time > timeout_reset && !returning && !mouseIsPressed){
		returning = true;
		return_fire_time = millis();
	}

	if(returning && millis() - return_fire_time > return_frame_time){
		return_fire_time = millis();
		if(curr_section === 'second'){
			if(index_left > 0){
				index_left --;
				movement_acum_left = map(index_left,0,imgs_left.length-1,0,img_height);
			}
			if(index_right > 0){
				index_right --;
				movement_acum_right = map(index_right,0,imgs_left.length-1,0,img_height);
			}if(index_right === 0 && index_left === 0){
				curr_section = 'first';
				index_center = imgs_center.length-1;
				movement_acum_center = img_height;
			}
		}else if(curr_section === 'first'){
			if(index_center > 0){
				index_center --;
				movement_acum_center = map(index_center,0,imgs_center.length-1,0,img_height);
			}


		}

	}


}

//***************************************************************

function mouseReleased(){
	waiting_for_click = true;
	left_active = false;
	center_active = false;
	right_active = false;

	last_movement_time = millis();
	returning = false;
}

//***************************************************************
//***************************************************************
//***************************************************************
//***************************************************************

function calibrateImages(){
	let img_width_max = width - (margin * 2);
	let img_height_max = height - (margin * 2);

	img_width = img_width_max;
	img_height = imgs_center[0].height * img_width/imgs_center[0].width;

	if (img_height > img_height_max) {
		img_height = img_height_max;
		img_width  = imgs_center[0].width * img_height/imgs_center[0].height;
	}

	img_x = width/2;
	img_y = height/2;
}

//***************************************************************

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	calibrateImages();
}

//***************************************************************

function keyPressed(){
	if(key === 'D' || key === 'd' )
		render_debug =! render_debug;
}

//***************************************************************

function renderDebug(){

	for(let i = 0 ; i < cursor_position.length ; i++){
		let x = (img_x - img_width/2) + img_width*cursor_position[i].x;
		let y = (img_y - img_height/2) + img_height*cursor_position[i].y;
		ellipse(x,y,50,50);
	}
	push();
	textAlign(RIGHT, TOP);
	textFont(debug_font);
	textSize(12);
	fill(0);
	let x = 150;
	let y = 50;
	pop();

}

//***************************************************************
