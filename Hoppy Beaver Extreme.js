/*
------------------------------------------------------------
New components
Pylons & Obstacles
    *Pylons are the same colour as your score text (yellow), and they'll increase your score
    *Obstacles are the colour that doesn't match your score text (red), and they'll decrease your score.
------------------------------------------------------------

*/


var score =0;
var pylon = [];

var Beaver = function(x, y) {
    this.x = x;
    this.y = y;
    this.img = getImage("creatures/Hopper-Happy");
    this.pylon = 0;
};

Beaver.prototype.draw = function() {
    fill(255, 0, 0);
    this.y = constrain(this.y, 0, height-50);
    image(this.img, this.x, this.y, 40, 40);
};

Beaver.prototype.hop = function() {
    this.img = getImage("creatures/Hopper-Jumping");
    this.y -= 5;
};

Beaver.prototype.fall = function() {
    this.img = getImage("creatures/Hopper-Happy");
    this.y += 5;
};

Beaver.prototype.checkForStickGrab = function(stick) {
    if ((stick.x >= this.x && stick.x <= (this.x + 40)) &&
        (stick.y >= this.y && stick.y <= (this.y + 40))&&
        (stick.obs === 1 || stick.obs === 3 || stick.obs === 4)){
        stick.y = -400;
        this.pylon++;
        }
    else if (
        (stick.x >= this.x && stick.x <= (this.x + 40)) &&
        (stick.y >= this.y && stick.y <= (this.y + 40)) &&
        (stick.obs === 2)) {
        stick.y = -400;
        this.pylon--;
    }
    score = this.pylon;
};

var Stick = function(x, y, obs) {
    this.x = x;
    this.y = y;
    this.obs=obs; // This will be a numeric value from 1 to 4
};

Stick.prototype.draw = function() {
    if(this.obs===1 || this.obs === 3 || this.obs === 4){ // The pylon which increase the score
    fill(240, 228, 8);
    } else if(this.obs === 2){ //The pylon which decrease the score
        fill(247, 8, 48);
    }
    rectMode(CENTER);
    rect(this.x, this.y, 5, 40);
};
    
var beaver = new Beaver(76, 300);

for (var i = 0; i < 80; i++) {  
    pylon.push(new Stick(i * 18 + 300, random(20, 260), round(random(1,4)))); 
    //The "obs" parameter is a number from 1 to 4 to randomly determine whether the stick is good or obs
}

var grassXs = [];
for (var i = 0; i < 25; i++) { 
    grassXs.push(i*20);
}


draw = function() {
    // static
    background(0, 204, 255);
    fill(196, 39, 102);
    rectMode(CORNER);
    rect(0, height*0.90, width, height*0.10);
    
    for (var i = 0; i < grassXs.length; i++) {
        image(getImage("cute/RampNorth"), grassXs[i], height*0.85, 20, 20);
        grassXs[i] -= 1;
        if (grassXs[i] <= -20) {
            grassXs[i] = width;
        }
    }
    
    for (var i = 0; i < pylon.length; i++) {
        pylon[i].draw();
        beaver.checkForStickGrab(pylon[i]);
        pylon[i].x -= 1;
        if(pylon[pylon.length-1].x < 0 && score >=35){ //If the last stick is past the screen and your score is at least 35, you win!
            fill(177, 181, 62);
            stroke(179, 184, 46);
            strokeWeight(3);
            rect(40,40,320,320,40);
            fill(188, 194, 25);
            rect(50,50,300,300,40);
            for (var y=0;y<=3;y++){
            image(getImage("creatures/Winston"),90+y*50,250,50,50);
            }
             textAlign(CENTER);
            fill(56, 54, 54);
            textSize(24);
            text("Flex Like Ooh",80,150,200,200);
            textSize(14);
            fill(255, 255, 255);
            text("N I C E",80,180,200,200);
            
        }
    }
    
    
    textSize(15);
    text("Score: " + score, 20, 30);
    textSize(15);
  
    if (keyIsPressed && keyCode === 0) {
        beaver.hop();
    } else {
        beaver.fall();
    }
    beaver.draw();
};
