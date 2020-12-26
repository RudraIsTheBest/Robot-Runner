var PLAY = 1;
var END = 0;
var gameState = PLAY;
var robot , robotImage;
var bg , bgImage;
var obstacleGroup , obstacle , obstacleImage;
var coinsGroup , coin , coinImage;
var gameover , gameoverImage;
var restart , restartImage;
var diamondGroup , diamond , diamondImage;
var collideSound;
var jumpSound;




function preload(){

  robotImage = loadImage("grey robot 1.png");
  bgImage = loadImage("forest2.png");
  obstacleImage = loadImage("rockGrass.png");
  coinImage = loadImage("coin_gold.png");
  gameoverImage = loadImage("gameover.png");
  restartImage = loadImage("restart2.png");
  diamondImage = loadImage("ore_diamond.png");
  jumpSound = loadSound("zapsplat_cartoon_spring_twang_ping_001_59066.mp3");
  
  collideSound = ("articulated_FUN+MONSTER+Droid1+robot+scream+02.mp3");
  
}


function setup() {
  createCanvas(400, 400);
 
  bg = createSprite(200,200,400,400);
  bg.addImage("bg" , bgImage);
  
  robot = createSprite(40,330,50,50);
  robot.scale = 0.08;
  robot.addImage("robot", robotImage);
  
  invisibleGround = createSprite(10,370,1000,20);
  invisibleGround.visible = false;
  
  obstacleGroup = createGroup();
  coinsGroup = createGroup();
  diamondGroup = createGroup();
  
  gameover = createSprite(200,200,400,400);
  gameover.visible = false;
  gameover.addImage("gameover",gameoverImage);
  gameover.scale = 2;
  
  restart = createSprite(200,350,20,20);
  restart.visible = false;
  restart.addImage("restart",restartImage);
  restart.scale = 0.5;
  
  score = 0;
  
}


function draw() {
 
  if((gameState === PLAY)){
     
  bg.velocityX = -(5 + score/50);

    if (bg.x < 0){
      bg.x = bg.width/2;
    }  
  
  if(keyDown("space")&& robot.y >= 220) {
    
    robot.velocityY = -10;
    jumpSound.play();
  }
  
   robot.velocityY = robot.velocityY + 0.8
  
  robot.collide(invisibleGround);
  
  spawnobstacle();
  spawncoins();
  spawndiamonds();
  
  if(obstacleGroup.isTouching(robot)) {
    
    gameState = END;    
    
    
  }
    
  if(coinsGroup.isTouching(robot)) {
    
   coinsGroup.destroyEach();
   score = score+5; 
    
  }
    
  if(diamondGroup.isTouching(robot)) {
    
    diamondGroup.destroyEach();
    score = score+10;
    
  }
    
    gameover.visible = false;
    restart.visible = false;
    robot.visible = true;
    
   
     
   
    
}
  else if (gameState === END) {
    
    obstacleGroup.setVelocityXEach(0);
    robot.velocityX = 0;
    bg.velocityX = 0;    
    coinsGroup.setVelocityXEach(0);
    diamondGroup.setVelocityXEach(0);
    gameover.visible = true;
    restart.visible = true;
    robot.visible = false;
    obstacleGroup.setLifetimeEach(-1);
    coinsGroup.setLifetimeEach(-1);
    diamondGroup.setLifetimeEach(-1);
    coinsGroup.destroyEach();
    obstacleGroup.destroyEach();
    diamondGroup.destroyEach();
    
  }
  
  if(mousePressedOver(restart)) {
      gameState = PLAY;
      score = 0;
    robot.collide(invisibleGround);
    
    }
  

  
drawSprites();
  
fill("yellow");
textSize(20);
text("SCORE :"+ score,150,30);

}

function spawnobstacle() {
  
  if (frameCount % 100 === 0) {
    var obstacle = createSprite(300,313,40,10);
    obstacle.x = Math.round(random(800,1200));
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.4;
   obstacle.velocityX = -(5 + score/50);
    
    obstacle.depth = robot.depth;
    robot.depth = robot.depth + 1;
    
    obstacleGroup.add(obstacle);
  }
  
}

function spawncoins() {
  
if (frameCount % 180 === 0) {  
  var coin = createSprite(300,315,40,10);
  coin.addImage(coinImage);
  coin.x = Math.round(random(800,1200));
  coin.scale = 0.4;
  coin.velocityX = -(5 + score/50);
  
  coin.depth = robot.depth;
  coin.depth = robot.depth + 1;
  
  coinsGroup.add(coin);
 }
}

function spawndiamonds() {
  
if (frameCount % 180 === 0) {  
  var diamond = createSprite(300,315,40,10);
  diamond.addImage(diamondImage);
  diamond.x = Math.round(random(800,1200));
  diamond.scale = 0.4;
  diamond.velocityX = -(5 + score/50);
  
  diamond.depth = robot.depth;
  diamond.depth = robot.depth + 1;
 
  
  diamondGroup.add(diamond);
 }
}
