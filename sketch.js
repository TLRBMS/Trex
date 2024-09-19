//variables
var PLAY=1;
var END=0;
var gameState =PLAY;
var Trex, Trex_runing, Trexcollided;
var suelo,sueloInv, Gsuelo;
var cloud2;
var cactus1, cactus2, cactus3, cactus11, cactus22, cactus33;
var grupobimbo, grupoverde;

var reinicio, reinicioimg
var GO, GOimg;

//guarda imagenes
function preload(){
  Trex_runing = loadAnimation("trex1.png" , "trex3.png" , "trex4.png");
Trexcollided = loadAnimation("trex_collided.png");

  Gsuelo = loadImage("ground2.png");
  cloud2 = loadImage("cloud.png");

  cactus1 = loadImage("obstacle1.png")
  cactus2 = loadImage("obstacle2.png")
  cactus3 = loadImage("obstacle3.png")
  cactus11 = loadImage("obstacle4.png")
  cactus22 = loadImage("obstacle5.png")
  cactus33 = loadImage("obstacle6.png")

  reinicioimg = loadImage("restart.png");
  GOimg = loadImage("gameOver.png");
  }

  //ejecuta solo una ves durante el juego
  function setup(){
    Trex= createSprite(60,180,15,35,);
    Trex.addAnimation("runing" , Trex_runing);
    Trex.addAnimation("collided", Trexcollided);
    Trex.scale = 0.3

    suelo = createSprite(300,190,600,10)
    suelo.addImage("ground", Gsuelo);
    suelo.velocityX = -3;
    suelo.x = width/2;

    sueloInv = createSprite(100,197,200,5)
    sueloInv.visible=false

    reinicio=createSprite(300,115);
    reinicio.addImage(reinicioimg);
    reinicio.scale=0.65
    reinicio.visible=false

    GO=createSprite(300,65);
    GO.addImage(GOimg);
    GO.scale=0.85
    GO.visible= false

    

    grupobimbo=createGroup();
    grupoverde=createGroup();

    }

  //realiza los movimientos
  function draw(){
   createCanvas(600,200);
    background(180);

    if (gameState == PLAY){

      if (suelo.x < 0){
        suelo.x = suelo.width/2;
      }
      cactuses();
      nubes();
      if(grupoverde.isTouching(Trex)){
        gameState=END;
      }
    }
    
    else if(gameState == END){

      GO.visible=true;
      reinicio.visible=true;

      Trex.changeAnimation("collided", Trexcollided);

      suelo.velocityX=0;

      grupobimbo.setLifetimeEach(-1);
      grupoverde.setLifetimeEach(-1);
      grupobimbo.setVelocityXEach(0);
      grupoverde.setVelocityXEach(0);

    }
    Trex.collide(sueloInv);
    drawSprites();

    if(keyDown("space")&& Trex.y>=178){
      Trex.velocityY = -9;
    }

    //gravedad
    Trex.velocityY = Trex.velocityY + 0.5;
    if(mousePressedOver(reinicio)){

      restart();
    }
   

   
  }

function nubes(){

  if(frameCount %60 == 0){
    var cloud = createSprite(600,30,20,20);
    cloud.velocityX= -3;
    cloud.y = Math.round(random(20,80))
    cloud.addImage("suelo",cloud2)
    cloud.scale = 0.7
    getComputedStyle.lifetime =220;
    grupobimbo.add(cloud);
  
  Trex.depth=cloud.depth
  Trex.depth=+1
  
 }
}
 function cactuses(){

  if(frameCount %50 == 0){
    var cactus = createSprite(600,175,10,40);
    cactus.velocityX= -3;

    var uno= Math.round(random(1,6));
    switch(uno){
      case 1: cactus.addImage(cactus1);
      break;
      case 2: cactus.addImage(cactus2);
      break;
      case 3: cactus.addImage(cactus3);
      break;
      case 4: cactus.addImage(cactus11);
      break;
      case 5: cactus.addImage(cactus22);
      break;
      case 6: cactus.addImage(cactus33);
      break;
      default: break;
    }

    cactus.scale=0.4;
    cactus.lifetime=210;
    grupoverde.add(cactus);
  }
 }




 function restart(){

  gameState=PLAY;
  GO.visible=false;
  reinicio.visible=false;
  
 }