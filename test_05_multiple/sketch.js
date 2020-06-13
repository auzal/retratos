let imgs = [];
let index;
let bg_color;

let img_x;
let img_y;

let cursor_position = [];
let section_breaks = [];
let sections = 3;
let curr_section = 0;

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
let waiting_for_click = true;
let waiting_for_drag = true;

let drag_direction ='';

let switching = false;

let render_debug = false;
let debug_font;

function preload(){
	let start = 2;
	for (let i=start; i < 55; i++) {
		let filename = 'assets/frame/' + i + '.jpg';
		imgs[i-start] = loadImage(filename);
	}
	arrow = loadImage('assets/arrow.png');
	console.log('loaded ' + imgs.length + ' images!');
	cursor_position.push(createVector(0.1,0));
	cursor_position.push(createVector(0.5,0));
	cursor_position.push(createVector(0.9,0));
	section_breaks.push(0);
	section_breaks.push(18);
	section_breaks.push(36);
	section_breaks.push(imgs.length-1);

	debug_font = loadFont('assets/mmr.ttf');
}

function setup() {
	createCanvas(windowWidth,windowHeight);
	bg_color = color(242, 228, 227);
	index = 0;
	calibrateImages();
	imageMode(CENTER);
}

function draw() {
	background(bg_color);
	if(millis() > 500){
		imageMode(CENTER);
		image(imgs[index],img_x,img_y, img_width, img_height);
	}
	fill(88,175,209);
	noStroke();
	// for(let i = 0 ; i < cursor_position.length ; i++){
	// 	let x = (img_x - img_width/2) + img_width*cursor_position[i].x;
	// 	let y = (img_y - img_height/2) + img_height*cursor_position[i].y;
	// 	ellipse(x,y,50,50);
	// }

	if(render_debug){
		renderDebug();
	}
}

function mousePressed(){
	waiting_for_click = false;
}

function mouseDragged() {

	if(!waiting_for_click){

		drag_direction = '';


		if(pmouseY > mouseY){
			drag_direction = 'UP';
		}else if(pmouseY < mouseY){
			drag_direction = 'DOWN';
		}


		if(drag_direction === 'UP'){

			if(switching){
				//	curr_section --;
				movement_acum = img_height ;
				switching = false;
			}else if(index === section_breaks[curr_section] && curr_section > 0){ // GO BACK ONE SECTION
				waiting_for_click = true;
				switching = true;
				curr_section --;
				movement_acum = img_height ;
			}else{
				movement_acum += mouseY - pmouseY;
				movement_acum = constrain(movement_acum, 0, img_height);
			}

		}else if(drag_direction === 'DOWN'){
			if(switching){
				curr_section++;
				movement_acum = 0;
				switching = false;
			}if(index === section_breaks[curr_section + 1]  && curr_section < sections - 1){ // GO TO NEXT SECTION
				switching = true;
				waiting_for_click = true;
			}else{
				movement_acum += mouseY - pmouseY;
				movement_acum = constrain(movement_acum, 0, img_height);
			}
		}

		index = int(map(movement_acum,0,img_height,section_breaks[curr_section], section_breaks[curr_section+1]));
		index = constrain(index, 0, imgs.length-1);
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

	img_x = width/2;
	img_y = height/2;
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	calibrateImages();
}

function keyPressed(){
	if(key === 'D' || key === 'd' )
	render_debug =! render_debug;
}

function renderDebug(){
	push();
	textAlign(RIGHT, TOP);
	textFont(debug_font);
	textSize(12);
	fill(0);
	let x = 150;
	let y = 50;
	text('image index = ', x,y);
	y += 15;
	text('section_start = ', x,y);
	y += 15;
	text('section_end = ', x,y);
	y += 15;
	text('current section = ', x,y);
	y += 15;
	text('drag direction = ', x,y);
	y += 15;
	text('waiting for drag = ', x,y);
	y += 15;
	text('waiting for click = ', x,y);
	y += 15;
	text('y acumulation = ', x,y);
	y += 15;
	text('switching = ', x,y);


	textAlign(LEFT, TOP);
	fill(50,120,150);
	x = 150;
	y = 50;
	text(index + '/' + imgs.length, x,y);
	y += 15;
	text(section_breaks[curr_section], x,y);
	y += 15;
	text(section_breaks[curr_section+1], x,y);
	y += 15;
	text(curr_section, x,y);
	y += 15;
	text(drag_direction, x,y);
	y += 15;
	text(waiting_for_drag, x,y);
	y += 15;
	text(waiting_for_click, x,y);
	y += 15;
	text(movement_acum, x,y);
	y += 15;
	text(switching, x,y);

	pop();

}
