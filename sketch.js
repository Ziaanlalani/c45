var life = 1;
var gamestate= 0
var play=0
var end =1
function preload() {

underwaterimg= loadImage("images/Underwater1.png")
swimmeranimation= loadAnimation("images/s1.png", "images/s2.png", "images/s3.png", "images/s4.png", "images/s5.png","images/s6.png","images/s7.png","images/s8.png","images/s9.png","images/s10.png",)
fish1= loadImage("images/fish 1.png")
fish2= loadImage("images/fish 2.png")
fish3= loadImage("images/fish 3.png")
diveroverimg= loadImage("images/s1.png")
gameoverimg= loadImage("images/gameover.png")

}
function setup() {
createCanvas(windowWidth,windowHeight)
swimmer=createSprite(200,500,5,5)
swimmer.addAnimation("swimmer animation", swimmeranimation)
swimmer.addImage("dead",diveroverimg)
swimmer.scale=1.3
swimmer.debug=true
swimmer.setCollider("rectangle",0,0,200,50)
obstaclesGroup= new Group();
gameover= createSprite(windowWidth/2, windowHeight/2, 10, 10)
gameover.addImage(gameoverimg)
gameover.visible=false
}
function draw() {
background (underwaterimg)

if(gamestate===play){

if (keyDown("up_arrow")){
    swimmer.y= swimmer.y-5
}
if (keyDown("down_arrow")){
    swimmer.y= swimmer.y+5
}

for(var i=0;i<obstaclesGroup.length;i++){
    if(obstaclesGroup.get(i).collide(swimmer)){
        obstaclesGroup.get(i).destroy();
        life=life-1
    } }

    if (life<=0){
        gamestate=end
    }

spawnObstacles();
}
else if (gamestate===end){
    text("Game Over", windowWidth/2, windowHeight/2)
    gameover.visible=true
    swimmer.changeAnimation("dead",diveroverimg)
}


drawSprites();
textSize(50)
stroke("red")
strokeWeight(3)
fill("black")
textFont("timesnewroman")
text("Life : "+life,1000,100)


}

function spawnObstacles() {
    if(frameCount % 60 === 0) {
      var obstacle = createSprite(windowWidth,165,10,40);
    obstacle.y=Math.round(random(50,windowHeight))

      obstacle.velocityX = -6
      //-(6 + 3*score/100);
      
      var rand = Math.round(random(1,3));
      switch(rand) {
        case 1: obstacle.addImage(fish1);
                break;
        case 2: obstacle.addImage(fish2);
                break;
        case 3: obstacle.addImage(fish3);
                break;
        default: break;
      }
      
      //assign scale and lifetime to the obstacle           
      obstacle.scale = 0.6;
      obstacle.lifetime = 300;
      //add each obstacle to the group
      obstaclesGroup.add(obstacle);
    }
  }