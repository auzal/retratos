class PortraitManager{

  constructor(){

    this.arrowOpacity = 255;
    this.arrowY;
    this.renderArrow = false;

    this.arrowTimeout = 7000;
    this.lastMovementTime = 0;
    this.arrow;

    this.arrowTravelFire = 0;
    this.arrowTravelTime = 1000;
    this.renderDebug = true;
    this.debugFont;

    this.index = 0;

    this.hand = loadImage('assets/mano2.png');
    this.portraits = [];
  }

  //***************************************************************

  addTriplePortrait(name,l,c,r){

    let aux = new PortraitThreeStripes(name, l, c, r);
    this.portraits.push(aux);

  }

  //***************************************************************

  addSimplePortrait(name,amt){

    let aux = new PortraitTwoStripes(name, amt);
    this.portraits.push(aux);

  }

  //***************************************************************

  init(){
    this.hand.resize(50,0);
    this.calibrateImages();
  }

  //***************************************************************


  calibrateImages(){
    for(let i = 0 ; i < this.portraits.length ; i++){
      this.portraits[i].calibrateImages();
    }
  }

  //***************************************************************

  render(){
    if(millis() > 500){
      this.portraits[this.index].render(this.renderDebug);
    }
    image(this.hand, mouseX, mouseY);
  }

  //***************************************************************

  update(){

  }

  //***************************************************************

  pressed(){
    this.portraits[this.index].pressed();

  }

  //***************************************************************

  dragged(){
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

}
