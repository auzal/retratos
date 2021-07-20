class PortraitThreeStripes{

  constructor(name, l, c, r){

    this.imgsCenter = [];
    this.imgsLeft = [];
    this.imgsRight = [];
    this.indexCenter = 0;
    this.indexRight = 0;
    this.indexLeft = 0;

    this.name = name;

    this.cursorPosition = [];
    this.currSection = 'first';

    this.movementAcumCenter = 0;
    this.movementAcumLeft = 0;
    this.movementAcumRight = 0;
    this.leftActive = false;
    this.rightActive = false;
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

    this.changeInNextDrag = false;

    this.loadImages(name, l, c, r);

  }

  //***************************************************************

  loadImages(name, l, c, r){

    let resFolder = checkResolution();

    console.log("loading from dir ->" + resFolder);

    for (let i=0; i < c; i++) {
      let filename = 'assets/retratos/' + name + '/center/'+ resFolder + nf(i+1,2) + '.jpg';
      this.imgsCenter[i] = loadImage(filename, successLoad, failLoad);
    }

    for (let i=0; i < l; i++) {
      let filename = 'assets/retratos/' + name + '/left/'+ resFolder + nf(i+1,2) + '.jpg';
      this.imgsLeft[i] = loadImage(filename, successLoad, failLoad);
    }

    for (let i=0; i < r; i++) {
      let filename = 'assets/retratos/' + name + '/right/'+ resFolder + nf(i+1,2) + '.jpg';
      this.imgsRight[i] = loadImage(filename, successLoad, failLoad);
    }
    this.cursorPosition.push(createVector(0.1,0));
    this.cursorPosition.push(createVector(0.5,0));
    this.cursorPosition.push(createVector(0.9,0));

  }

  //***************************************************************


  render(renderDebug){
    if(millis() > 500){
      imageMode(CENTER);
      if(this.currSection === 'first'){
        image(this.imgsCenter[this.indexCenter],imgX,imgY, imgWidth, imgHeight);
      }else 	if(this.currSection === 'second'){
        image(this.imgsLeft[this.indexLeft],imgX-(imgWidth/4),imgY, imgWidth/2, imgHeight);
        image(this.imgsRight[this.indexRight],imgX+(imgWidth/4),imgY, imgWidth/2, imgHeight);
      }

    }

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
    imgHeight = this.imgsCenter[0].height * imgWidth/this.imgsCenter[0].width;

    if (imgHeight > imgHeight_max) {
      imgHeight = imgHeight_max;
      imgWidth  = this.imgsCenter[0].width * imgHeight/this.imgsCenter[0].height;
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

    if(this.currSection === 'first'){
      this.leftActive = false;
      this.rightActive = false;
      if(mouseX < width/2 + imgWidth/2 && mouseX > width/2  - imgWidth/2){
        this.centerActive = true;
      }
    }else if(this.currSection === 'second'){

      if(mouseX < width/2 && mouseX > width/2  - imgWidth/2){
        this.leftActive = true;
        this.rightActive = false;

      }else if (mouseX > width/2 && mouseX < width/2 + imgWidth/2){
        this.leftActive = false;
        this.rightActive = true;
      }

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
        if(this.currSection === 'first' && this.centerActive){
          this.movementAcumCenter += mouseY - pmouseY;
          this.movementAcumCenter = constrain(this.movementAcumCenter, 0, imgHeight);
          this.indexCenter = int(map(this.movementAcumCenter,0,imgHeight,0,this.imgsCenter.length-1));
          this.indexCenter = constrain(this.indexCenter, 0, this.imgsCenter.length-1);
          if(this.indexCenter === this.imgsCenter.length-1){
            this.currSection = 'second';
            this.movementAcumLeft = 0;
            this.movementAcumRight = 0;
            this.movementAcumLeft = constrain(this.movementAcumLeft, 0, imgHeight);
            this.indexLeft = int(map(this.movementAcumLeft,0,imgHeight,0,this.imgsLeft.length-1));
            this.indexLeft = constrain(this.indexLeft, 0, this.imgsLeft.length-1);
            this.movementAcumRight = constrain(this.movementAcumRight, 0, imgHeight);
            this.indexRight = int(map(this.movementAcumRight,0,imgHeight,0,this.imgsRight.length-1));
            this.indexRight = constrain(this.indexRight, 0, this.imgsRight.length-1);
          }
        }else if(this.currSection === 'second'){
          if(this.leftActive){
            this.movementAcumLeft += mouseY - pmouseY;
            this.movementAcumLeft = constrain(this.movementAcumLeft, 0, imgHeight);
            this.indexLeft = int(map(this.movementAcumLeft,0,imgHeight,0,this.imgsLeft.length-1));
            this.indexLeft = constrain(this.indexLeft, 0, this.imgsLeft.length-1);
          } else 	if(this.rightActive){
            this.movementAcumRight += mouseY - pmouseY;
            this.movementAcumRight = constrain(this.movementAcumRight, 0, imgHeight);
            this.indexRight = int(map(this.movementAcumRight,0,imgHeight,0,this.imgsRight.length-1));
            this.indexRight = constrain(this.indexRight, 0, this.imgsRight.length-1);
          }
        }
        //-------------------- UP ----------
      }  else  if(this.dragDirection === 'UP'){

        if(this.currSection != 'first'){

          if(this.changeInNextDrag){
            this.changeInNextDrag = false;
            if(this.indexRight === 0 && this.indexLeft === 0){
              this.currSection = 'first';
              this.movementAcumCenter = imgHeight;
              this.centerActive = true;
            }

          }else if(this.indexRight === 0 && this.indexLeft === 0){

            this.changeInNextDrag = true;
            this.waitingForClick = true;

          }
        }
        if(!this.waitingForClick){
          if(this.currSection === 'second'){
            if(this.leftActive){
              this.movementAcumLeft  -= pmouseY - mouseY;
              this.movementAcumLeft = constrain(this.movementAcumLeft, 0, imgHeight);
              this.indexLeft = int(map(this.movementAcumLeft,0,imgHeight,0,this.imgsLeft.length-1));
              this.indexLeft = constrain(this.indexLeft, 0, this.imgsLeft.length-1);
            } else 	if(this.rightActive){
              this.movementAcumRight  -= pmouseY - mouseY;
              this.movementAcumRight = constrain(this.movementAcumRight, 0, imgHeight);
              this.indexRight = int(map(this.movementAcumRight,0,imgHeight,0,this.imgsRight.length-1));
              this.indexRight = constrain(this.indexRight, 0, this.imgsRight.length-1);
            }

          }else   if(this.currSection === 'first' && this.centerActive){
            this.movementAcumCenter -= pmouseY - mouseY;
            this.movementAcumCenter = constrain(this.movementAcumCenter, 0, imgHeight);
            this.indexCenter = int(map(this.movementAcumCenter,0,imgHeight,0,this.imgsCenter.length-1));
            this.indexCenter = constrain(this.indexCenter, 0, this.imgsCenter.length-1);
            if(this.indexCenter === 0){
              //  this.currSection = 'second';
              //  this.movementAcumLeft = 0;
              //  this.movementAcumRight = 0;
            }
          }
        }  // --------------
      }

      //---- WAITING FOR CLICK
    }
  }

  //***************************************************************

  released(){
    this.waitingForClick = true;
    this.leftActive = false;
    this.centerActive = false;
    this.rightActive = false;

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
    text("RIGHT ACTIVE: " + this.rightActive, x, y);
    y += 20;
    text("LEFT ACTIVE: " + this.leftActive, x, y);
    y += 20;
    text("SECTION: " + this.currSection, x, y);
    y += 20;
    text("INDEX CENTER: " + this.indexCenter, x, y);
    y += 20;
    text("INDEX RIGHT: " + this.indexRight, x, y);
    y += 20;
    text("INDEX LEFT: " + this.indexLeft, x, y);
    y += 20;
    text("ACUM CENTER: " + this.movementAcumCenter, x, y);
    y += 20;
    text("ACUM LEFT: " + this.movementAcumLeft, x, y);
    y += 20;
    text("ACUM RIGHT: " + this.movementAcumRight, x, y);
    y += 20;
    pop();

    renderLimits();

  }

  //***************************************************************

  reset(){
    this.indexCenter = 0;
    this.indexRight = 0;
    this.indexLeft = 0;
    this.currSection = 'first';
    this.movementAcumCenter = 0;
    this.movementAcumLeft = 0;
    this.movementAcumRight = 0;
    this.leftActive = false;
    this.rightActive = false;
    this.centerActive = false;
    this.waitingForClick = true;
    this.waitingForDrag = true;
  }

}
