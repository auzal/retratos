class PortraitTwoStripes{

  constructor(name, amt){

    this.imgs = [];
    this.index = 0;
      this.cursorPosition = [];

    this.name = name;

    this.movementAcum = 0;
    this.centerActive = false;

    this.waitingForClick = true;
    this.waitingForDrag = true;

    this.timeoutReset = 5000;
    this.timeAtFinish = 0;
    this.finished;

    this.dragDirection = '';

    this.returning = false;

    this.returnFrameTime = 50;
    this.returnFireTime = 0;

    this.loadImages(name, amt);
    //  this.calibrateImages();

  }

  //***************************************************************

  loadImages(name, amt){

    let resFolder = checkResolution();

  //  console.log("loading from dir ->" + resFolder);

    for (let i=0; i < amt; i++) {
      let filename = 'assets/retratos/' + name + '/'+ resFolder + nf(i+1,2) + '.jpg';
      this.imgs[i] = loadImage(filename, successLoad, failLoad);
    }

    this.cursorPosition.push(createVector(0.5,0));

  }

  //***************************************************************


  render(renderDebug){
    if(millis() > 500){
      imageMode(CENTER);
      image(this.imgs[this.index],imgX,imgY, imgWidth, imgHeight);

    }

    //	handleReturn();

    if(renderDebug){
      fill(88,175,209);
      noStroke();
      this.renderDebug();
    }
  }

  //***************************************************************


  calibrateImages(){
    let imgWidth_max = parentWidth - (margin * 2);
    let imgHeight_max = parentHeight - (margin * 2);

    imgWidth = imgWidth_max;
    imgHeight = this.imgs[0].height * imgWidth/this.imgs[0].width;

    if (imgHeight > imgHeight_max) {
      imgHeight = imgHeight_max;
      imgWidth  = this.imgs[0].width * imgHeight/this.imgs[0].height;
    }

    sketchWidth = imgWidth + margin * 2;
    sketchHeight = imgHeight + margin * 2

    imgX = sketchWidth/2;
    imgY = sketchHeight/2;
  }

  //***************************************************************

  pressed(){
    this.waitingForClick = false;
    this.returning = false;

    if(mouseX < width/2 + imgWidth/2 && mouseX > width/2  - imgWidth/2){
      this.centerActive = true;
    }


  }

  //***************************************************************


  dragged(){
    if(!this.waitingForClick){

      //----- DIRECTION DETECT ------------
      this.dragDirection = '';
      if(pmouseY > mouseY){
        this.dragDirection = 'UP';
      }else if(pmouseY < mouseY){
        this.dragDirection = 'DOWN';
      }
      //------------------------------------


      //----- DOWN ------------

      if(this.dragDirection === 'DOWN'){
        if(this.centerActive){
          this.movementAcum += mouseY - pmouseY;
          this.movementAcum = constrain(this.movementAcum, 0, imgHeight*2);
          this.index = int(map(this.movementAcum,0,imgHeight*2,0,this.imgs.length-1));
          this.index = constrain(this.index, 0, this.imgs.length-1);

        }
        //-------------------- UP ----------
      }  else  if(this.dragDirection === 'UP'){

      if(this.centerActive){
            this.movementAcum -= pmouseY - mouseY;
            this.movementAcum = constrain(this.movementAcum, 0, imgHeight*2);
            this.index = int(map(this.movementAcum,0,imgHeight*2,0,this.imgs.length-1));
            this.index = constrain(this.index, 0, this.imgs.length-1);

          }
        }  // --------------
      }

      //---- WAITING FOR CLICK

  }

  //***************************************************************

  released(){
    this.waitingForClick = true;
    this.centerActive = false;
    this.lastMovementTime = millis();
    this.returning = false;
  }

  //***************************************************************

  renderDebug(){

    for(let i = 0 ; i < this.cursorPosition.length ; i++){
      let x = (imgX - imgWidth/2) + imgWidth*this.cursorPosition[i].x;
      let y = (imgY - imgHeight/2) + imgHeight*this.cursorPosition[i].y;
      ellipse(x,y,50,50);
    }
    push();
    textAlign(LEFT, TOP);
    textFont(debugFont);
    textSize(12);
    fill(255);
    let x = 50;
    let y = 50;
    text("ID: " + this.name, x, y);
    y += 20;
    text("CENTER ACTIVE: " + this.centerActive, x, y);
    y += 20;
    text("INDEX: " + this.index, x, y);
    y += 20;
    text("ACUM: " + this.movementAcum, x, y);
    y += 20;
    pop();

    renderLimits();

  }


  //***************************************************************

  reset(){
    this.index = 0;
    this.movementAcum = 0;
    this.centerActive = false;
    this.waitingForClick = true;
    this.waitingForDrag = true;
  }

}
