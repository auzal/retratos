let vid;

let loaded = false;

let imgs = [];

let index;

function preload(){
//vid = createVideo(['assets/paola_retrato2.mp4',]);
let start = 50;
for (let i=start; i<103; i++) {
	let filename = 'assets/frame/frame-' + nf(i, 6, 0) + '.jpg';
	//print(filename)
    imgs[i-start] = loadImage(filename); 
  }

}
function setup() {
  createCanvas(800,800);
  // specify multiple formats for different browsers
  index = 0;
}

function draw() {
	noCursor();
 	if(millis() > 500){
 		image(imgs[index],0,0);
 	}
 	if(mouseIsPressed){
 	fill(255,42,69,90);
 	noStroke();
 }else{
 	stroke(255,42,69,90);
 	noFill();
 }	strokeWeight(4);

 	ellipse(mouseX, mouseY, 70, 70);
}

function mouseDragged() {

	let y = mouseY;

	if(y<0){
		y = 0;
	}else if(y>height){
		y = height;

	}
	
 index = int(map(y,0,height,0,imgs.length-2));

 print(index);

 //vid.play();
 
 //log("out");
}

