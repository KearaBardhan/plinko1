const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var particles
var divisions=[]
var divisionsHeight=300
var particle=[]
var plinkos=[]
var line
var gameState='PLAY'
var count=0
var score=0


function setup() {
  createCanvas(800,700);
  engine = Engine.create();
	world = engine.world;

  ground=new Ground(400,690,800, 20)

  for(var i=0; i<=width; i=i+80){
    divisions.push(new Divisions(i,height-divisionsHeight/2,10,divisionsHeight))
      }

  for(var j=75; j<=width;j=j+50){
    plinkos.push(new Plinko(j,75))
  }

  for(var j=50; j<=width;j=j+50){
    plinkos.push(new Plinko(j,175))
  }

  for(var j=75; j<=width;j=j+50){
    plinkos.push(new Plinko(j,275))
  }

  for(var j=50; j<=width;j=j+50){
    plinkos.push(new Plinko(j,375))
  }
  Engine.run(engine)

}

function draw() {
  background(0);  
  drawSprites();
  Engine.update(engine);

  textSize(35)
  text("Score:" + score, 20, 40)
  fill(255)

  textSize(35)
  text("500", 15,550)
  text("500", 90,550)
  text("500", 170,550)
  text("500", 250,550)
  text("100", 330,550)
  text("100", 410,550)
  text("100", 490,550)
  text("200", 570,550)
  text("200", 650,550)
  text("200", 730,550)
  
  
  for (var n=0; n<divisions.length; n++){
    divisions[n].display()
    }
    if(frameCount%60===0){

      particle.push(new Particle (random(width/2-30, width/2+30), 10,10))
    }

    if(particle!==null){
      particle.display()
    }

    if(particle.body.position.y> 700){
       if (particle.body.position.x<300){
         score=score+500
         particle=null
         if(count>=5){
           gameState='END'
         }

       }
    }
    else if( particle.body.position.x<600 && particle.body.position.x>301){
      score=score+100
      particle=null
      if(count>=5){
        gameState='END'
      }
    }

    else if( particle.body.position.x<900 && particle.body.position.x>601){
      score=score+200
      particle=null
      if(count>=5){
        gameState='END'
      }
    }
  



    for (var h=0; h<particle.length; h++){
      particle[h].display()
      }

      for (var j=0; j<plinkos.length; j++){
        plinkos[j].display()
        }

        ground.display()

        if(gameState==='END'){
          background("black")
          fill("pink")
          textSize(100)
          text("Game Over", 200,400)
        }
}

function mousePressed (){
  if(gameState!=='END'){
    count++
    particle=new Particle(mouseX, 50,10,10)
  }
}