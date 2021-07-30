 var bg ,prince,princerunning,cryingprincess,ob1;
 var princess;
 var demon,drunning;
 var arrowGroup,obstaclesGroup;
 var flag=0;
 var endpg;
 
 function preload()
{
 bg=loadImage("images/path.png")
 endpg=loadImage("images/a.jpg")
  cryingprincess=loadAnimation("images/psad.png")
  ob1=loadImage("images/ob1.png")
  princerunning=loadAnimation("images/prun11.png")//,"images/prun2.png")
  drunning=loadAnimation("images/d3-a.png","images/d3-b.png","images/d3-c.png")

}

function setup() 
{
  createCanvas(1300, 600);

bgsprite=createSprite(650,300);
bgsprite.velocityX=-2
bgsprite.addImage(bg)


princess=createSprite(1200,500)
princess.addAnimation("crying",cryingprincess)
princess.scale=0.2

prince=createSprite(100,550)
prince.addAnimation("running",princerunning)

demon=createSprite(1100,500)
demon.addAnimation("running",drunning)
demon.scale=0.5
demon.velocityY=-8

wall1=createSprite(1100,50,200,20)
wall1.visible=false

wall2=createSprite(1100,575,200,20)
wall2.visible=false

ground=createSprite(100,575,200,20)
ground.visible=false

arrowGroup=new Group();
obstaclesGroup=new Group();

}

function draw() 
{
 
  background(0);

  if(bgsprite.x<320){
    bgsprite.x=650
  }

  spawnob();

  if(keyDown("space")){
    prince.velocityY=-12
  }

prince.velocityY=prince.velocityY+0.5

if(keyWentDown("right")){
  shootarrow()
}

prince.collide(ground)

demon.bounceOff(wall1)
demon.bounceOff(wall2)

for(var i=0; i<obstaclesGroup.length;i++){
  if(obstaclesGroup.get(i).isTouching(arrowGroup)){
    obstaclesGroup.get(i).destroy()
    arrowGroup.destroyEach()
  }
}

drawSprites();

if(arrowGroup.isTouching(demon)){
  demon.destroy()
  flag=1;
}


if(flag===1){
  background(endpg)
  textSize(30)
  fill("red")
  text("Game Over",700,500)
obstaclesGroup.destroyEach();
}

}

function spawnob(){
if(frameCount % 120===0){
    obs=createSprite(1000,500)
    obs.addImage(ob1)
    obs.velocityX=-5
    obs.scale=0.2
    obstaclesGroup.add(obs)

  }
}

function shootarrow(){
  var arrow=createSprite(100,prince.y,50,5)
  arrow.velocityX=6
  arrowGroup.add(arrow)
}