var trex, trex_run
var ground
var cloudi,obstacleG,cloudG;
var PLAY = 1;
var END = 0;
var GAMESTATE = PLAY;
function preload() {
  trex_run = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  groundi = loadImage("ground1.png");
  cloudi = loadImage("cloud.png");
  obi1 = loadImage("obstacle1.png");
  obi2 = loadImage("obstacle2.png");
  obi3 = loadImage("obstacle3.png");
  obi4 = loadImage("obstacle4.png");
  obi5 = loadImage("obstacle5.png");
  obi6 = loadImage("obstacle6.png");
  checkpoint= loadSound("checkpoint.mp3");
  diept= loadSound("die.mp3");
  jumpt= loadSound("jump.mp3");
  restarti = loadImage("restart.png");
  gameoveri = loadImage("gameOver.png");
  sunA = loadAnimation("sun.png");
}
function setup() {
  createCanvas(windowWidth,windowHeight);
  trex = createSprite(50,height-70,20,50);
  trex.addAnimation("running",trex_run);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.1; 
  
  sun= createSprite(width-50,100,10,10);
  sun.addAnimation("sun",sunA);
  sun.scale=0.1;

  score=0;
  ground = createSprite(width/2,height,width,2);
  ground.addImage("ground",groundi);
  ground.x = width/2;

  invisibleGround= createSprite(width/2,height-10,width,125);
  invisibleGround.visible = false;

  obstacleG = new Group();
  cloudG = new Group();
  trex.debug=false; 
  trex.setCollider("rectangle",0,0,40,60);

  gameover = createSprite(width/2,height/2-50);
  restart = createSprite(width/2,height/2);
  gameover.addImage("gameover",gameoveri);
  restart .addImage("restart",restarti);
  gameover.scale=0.5;
  restart.scale=0.1;
}
function draw() 
{
  //SET BACKGROUND COLOUR 
  background("white");
 text("SCORE : "+score,500,50);
 

 gameover.visible = false;
restart .visible = false;

 if(GAMESTATE == PLAY){
  ground.velocityX = -(2+score/100);
  score=score+Math.round(frameCount/60);

  //ENDLESS GROUND
  if(ground.x <0){
    ground.x = ground. width/2;
  }

  if(score%100 == 0 && score>0){
    checkpoint.play();
  }
  //JUMP WHEN THE SPACE KEY IS PRESSED
  if (trex.y >= 150 && keyDown("space") || touches.length>0){
    trex.velocityY = -15;
    jumpt.play();
    touches = [];
  }
 trex.velocityY = trex.velocityY+0.5;

 spawnClouds();
 spawnObstacle();

 if(obstacleG.isTouching(trex)){
   GAMESTATE = END;
   diept.play();
 }
 }
 else if(GAMESTATE == END){
  ground.velocityX = 0;
  trex.velocityY = 0;
obstacleG.setVelocityXEach(0);
cloudG.setVelocityXEach(0);

trex.changeAnimation("collided",trex_collided);

obstacleG.setLifetimeEach(-3);
cloudG.setLifetimeEach(-3);

gameover.visible = true;
restart .visible = true;
 }
 trex.collide(invisibleGround);

 if(mousePressedOver(restart)){
   reset();
 }
  drawSprites();

}

function reset(){
  score = 0;
  gamestate = PLAY;
gameover.visible = false;
restart .visible = false;
trex.changeAnimation("running",trex_run);

obstacleG.destroyEach();
cloudG.destroyEach();


}

function spawnClouds(){
  if (frameCount % 80==0){ 
  var clouds = createSprite(width+20,height-300,40,10);
  clouds.y = Math.round(random(35,100));
  clouds.velocityX=-3;
  clouds.addImage(cloudi);
  clouds.scale = 0.4;

  clouds.lifetime=400;
  clouds.depth = trex.depth;
  trex.depth += 1;
  cloudG.add(clouds);
  } 
}
  
function spawnObstacle(){
  if (frameCount % 120==0){ 
    var obstacle = createSprite(600,height-95,10,40);
    obstacle.velocityX=-3;
    
    var r = Math.round(random(1,6));
    switch(r){
      case 1:
        obstacle.addImage(obi1); break;
        case 2:
          obstacle.addImage(obi2); break;
          case 3:
            obstacle.addImage(obi3); break;
            case 4:
              obstacle.addImage(obi4); break;
              case 5:
                obstacle.addImage(obi5); break;
                case 6:
                  obstacle.addImage(obi6); break;
                  default: break;
                                
    }
    obstacle.scale = 0.3;
  
    obstacle.lifetime=400;
    obstacleG.add(obstacle);
    } 
}




