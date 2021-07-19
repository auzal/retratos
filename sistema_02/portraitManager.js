class PortraitManager{

  constructor(){

    this.arrowOpacity = 255;
    this.arrowY;
    this.renderArrow = false;

    this.arrowTimeout = 7000;
    this.lastMovementTime = 0;

    this.arrowTravelFire = 0;
    this.arrowTravelTime = 1000;
    this.renderDebug = false;
    this.debugFont;

    this.index = 0;

    this.hand = loadImage('assets/mano2.png');
    this.portraits = [];
  }

  //***************************************************************

  addTriplePortrait(name,l,c,r){

    let aux = new PortraitThreeStripes(name, l, c, r);
    this.portraits.push(aux);

    totalImgNum += l + c + r;
  }

  //***************************************************************

  addSimplePortrait(name,amt){

    let aux = new PortraitTwoStripes(name, amt);
    this.portraits.push(aux);

    totalImgNum += amt;

  }

  //***************************************************************

  init(){
    this.hand.resize(50,0);
  //  this.calibrateImages();
  }

  //***************************************************************


  calibrateImages(){
  //  for(let i = 0 ; i < this.portraits.length ; i++){
    //  this.portraits[i].calibrateImages();
//    }
  //  this.portraits[0].calibrateImages();
  }

  //***************************************************************

  render(){
    if(millis() > 500){
      this.portraits[this.index].render(this.renderDebug);
    }
    if(this.renderArrow){
      push();
      tint(255,this.arrowOpacity);
      image(this.hand, width/2, this.arrowY);
      pop();
    }

  }

  //***************************************************************

  update(){
    if(millis() - this.lastMovementTime > this.arrowTimeout ){
      this.fireArrow();
    }

    if(this.renderArrow){
      let time = millis() - this.arrowTravelFire;
      if(time > this.arrowTravelTime){
        this.renderArrow = false;
        this.lastMovementTime = millis();
      }else{
        let lerp = time/this.arrowTravelTime;
        lerp = sinOut(lerp);
      //  console.log(lerp);
        this.arrowY = map(lerp, 0, 1.0, imgY - imgHeight*.4, imgY);
        this.arrowOpacity = ((1.0 - lerp)*2) * 255;
      }
    }
  }

  //***************************************************************

  pressed(){
    this.portraits[this.index].pressed();

  }

  //***************************************************************

  dragged(){
    this.lastMovementTime = millis();
    this.portraits[this.index].dragged();
  }

  //***************************************************************

  released(){
    this.portraits[this.index].released();
  }

  //***************************************************************

  reset(){
    this.portraits[this.index].reset();
  }

  //***************************************************************

  next(){
    this.index++;
    //console.log(this.index);
    if(this.index > this.portraits.length-1){
      this.index = 0;
    }
    this.reset();
  }

  //***************************************************************

  previous(){
    this.index--;
    if(this.index < 0 ){
      this.index = this.portraits.length-1;
    }
    this.reset();
  }

    //***************************************************************

    fireArrow(){
        this.arrowTravelFire = millis();
        this.renderArrow = true;
        this.arrowY = imgY - imgHeight*.4;
        this.lastMovementTime = millis();
    }

    //***************************************************************

    findById(id){
        id = id.toLowerCase();

        for(let i = 0 ; i < this.portraits.length ; i++){
          let pId = this.portraits[i].name.toLowerCase();
          if(pId === id){
            this.index = i;
            this.reset();
            break;
          }
        }
    }

}
