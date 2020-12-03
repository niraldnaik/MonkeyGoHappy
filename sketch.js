var monkey, monkey_running, ground;
var banana, bananaImage, rock, rockI
var FoodGroup, rocks
var score
var bg , bgImg;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  rockI = loadImage("obstacle.png");
  bgImg = loadImage("jungle.jpg")

}



function setup() {
  createCanvas(400, 400);

  monkey = createSprite(50, 300, 20, 20)
  monkey.addAnimation("run", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(0, 390, 800, 20)
  ground.visible = false;

  ground.velocityX = -4;

  FoodGroup = new Group();
  rocks = new Group();
  
  bg = createSprite(200,200,400,400)
  bg.addImage(bgImg);
  bg.depth = -5;
  bg.velocityX = -5;
}


function draw() {
  background("white");
  
  score = frameCount;
 
  
  if (bg.x === 0){
    bg.x = 200;
    
  }
  
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    
    if(monkey.scale === 0.07){
      
      monkey.scale = 0.1;
    }
    
  }
   
  if(rocks.isTouching(monkey)){
   
    
    if(monkey.scale === 0.1){
      
      monkey.scale = 0.07;
    }
  }

  monkey.velocityY = monkey.velocityY + 0.8;

  monkey.collide(ground);

  if (keyDown("space") && monkey.y >  200) {

    monkey.velocityY = -10;
  }

  ground.velocityX = -6;

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  food();
  obstacles();

  drawSprites();
  
  fill("black")
   
  textSize(20);
  
  text("S urvivalTime: " + score , 120,50);
  
}

function food() {

  if (frameCount % 80 === 0) {
    banana = createSprite(400, random(120, 200), 10, 10);
    banana.addImage(bananaImage);
    banana.velocityX = -4;
    banana.scale = 0.1;
    FoodGroup.add(banana);
  }
}

function obstacles() {

  if (frameCount % 300 === 0) {
    rock = createSprite(400, 360, 10, 10);
    rock.addImage(rockI);
    rock.velocityX = -5;
    rock.scale = 0.2;
    rock.depth = -1;
    rocks.add(rock);
  }
}