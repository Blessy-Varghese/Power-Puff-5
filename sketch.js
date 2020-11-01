
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var gameState="intro";
var edges;
var obstaclesGroup; 
var positiveGroup; 
var negativeGroup; 
var life=3;
var confidence=0;
var end1,end2;
function preload()
{
	stand=loadImage("girl.png");
	
	building4=loadImage("building4.png");
	building6=loadImage("building7.jpg");

	final2=loadImage("final2.png");

	final=loadImage("final.png");

	end=loadImage("end1.png");
	win=loadImage("win.jpg");
	gameOverImage=loadImage("gameOver.jpg");

	fly=loadImage("fly.png");
	kick=loadImage("kick.png");
	logo=loadImage("logo.png");

	villan1=loadImage("villan1.png");
	villan2=loadImage("villan2.png");
	villan3=loadImage("villan3.png");
	villan4=loadImage("villan4.png");
	villan5=loadImage("villan5.png");

	confidenceImage=loadImage("confidence.png");

	negative1=loadImage("negative1.png");
	negative2=loadImage("negative2.png");
	negative3=loadImage("negative3.png");
	negative4=loadImage("negative4.png");
	negative5=loadImage("negative5.png");

	positive1=loadImage("positive1.png");
	positive2=loadImage("positive2.png");
	positive3=loadImage("positive3.png");
	positive4=loadImage("positive4.png");
	positive5=loadImage("positive5.png");

}

function setup() {
	createCanvas(1000, 600);
	edges=createEdgeSprites();

	lvl1b=createSprite(500,300);
	lvl1b.addImage(building6);
    lvl1b.x = lvl1b.width/2;
	lvl1b.visible=false;

	end1=createSprite(500,400);
	end1.addImage(final2)
	end1.scale=0.5;
	end1.visible=false;

	World.frameCount=10;

	girl=createSprite(60,500);
	girl.addImage(stand);
	girl.scale=0.15;
	girl.visible=false;

	obstaclesGroup=new Group();
	positiveGroup=new Group();
	negativeGroup=new Group();

	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.


	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background("white");
 // girl.addImage(stand);
  girl.collide(edges);

  
  if (lvl1b.x < 400){
	lvl1b.x = lvl1b.width/2;
  }


  drawSprites();

	if(keyDown(UP_ARROW)){
		girl.y-=20;	
		girl.addImage(fly);
		girl.scale=0.15;
	}

	if(keyDown(DOWN_ARROW)){
		girl.y+=5;
		girl.addImage(stand);
	}

	if(keyDown(LEFT_ARROW)){
		girl.x-=5;
		girl.addImage(stand);
	}

	if(keyDown(RIGHT_ARROW) && girl.y < 400){
		girl.x+=5;
		girl.addImage(fly);
		girl.scale=0.15;
	}

	//girl to stand when on the ground
	if(girl.isTouching(edges[3])){
		girl.addImage(stand);
	}


  //gravity to bring her down
	girl.velocityY+=0.1;

  if(gameState==="intro"){
	  intro();
  }

  if(gameState==="level1"){
		level1();
  }

  if(gameState==="level2"){
		level2();
  }

  if(gameState==="over"){
	  gameOver();
  }

  if(gameState==="end"){
	theEnd();
}

if(gameState==="win"){
	winner();
}

if(girl.isTouching(obstaclesGroup)){

	obstaclesGroup.destroyEach();
	life--;
	confidence++;
	girl.addImage(kick);
	
  }

  if(girl.isTouching(positiveGroup)){

	positiveGroup.destroyEach();
	confidence++;
	
  }

  if(girl.isTouching(negativeGroup)){

	negativeGroup.destroyEach();
	life--;
	girl.addImage(kick);
	
  }

//to display lifetime
push();
	textSize(12);
	stroke("red");
	strokeWeight(3);
	text("L  I  F  E ", 850,45);
	strokeWeight(2);
	text("C O N F I D E N C E ", 785,20);
	rectMode(CENTER);
pop();

stroke("black");
strokeWeight(3);
rect(950,40,90,30);

if(life===3){
		
	fill(17,226,53);
	rect(950,40,90,30);
}

if(life===2){
	
	fill(17,226,53);
	rect(935,40,60,30);
}

if(life===1){
	
	fill(17,226,53);
	rect(918,40,30,30);
}
if(life===0){
	gameState="over";
}
 
for(var i=1; i<=confidence; i++){
	image(confidenceImage,880+(i*25),5,20,20);
}

}

function intro(){
	
	//logos at the top
	image(logo,380,10,500,200);
	image(final,0,-80,400,400);
	
	//villan and their texts
	textSize(18);
	fill("black");
	image(villan1,40,320,100,100);
	text("Ms.Failure",100,450);
	image(villan2,180,320,200,100);
	text("Mr.Bully",340,450);
	image(villan3,440,320,110,100);
	text("Ms.Evil",520,450);
	image(villan4,640,320,100,100);
	text("Mr.Peer P",720,450);
	image(villan5,780,320,200,100);
	text("Mr.Chaos",880,450);

	//to text to start game
	push();
	textSize(30);
	stroke("black");
	fill("orange");
	strokeWeight(3);
	text("Save THE CITY OF YOUR MIND from these villans",150,300);
	stroke("black");
	fill("teal");
	strokeWeight(2);
	text("Use the ARROW KEYS to keep your mind at peace",200,550);
	textSize(20);
	
	fill("black");
	stroke("black");
	text("Press << ENTER >> to start the game",400,580);
	pop();

	//to go to the next level
	if(keyDown("ENTER")){
		gameState="level1";
	}
}
function level1(){

	lvl1b.addImage(building6);

	lvl1b.velocityX=-1;
	lvl1b.visible=true;

	if(frameCount%1500===0){
		confidence++;
	}


	if(confidence===3){
		life=3;
		confidence=0;
		gameState="level2";
	}

	girl.visible=true;

	push();
	fill("white");
	stroke("black");
	strokeWeight(4);
	textSize(20);
	text("LEVEL 1: Protect your mind from the villans!!",250,20);
	
	strokeWeight(2);
	text("Deal with them but do not let them kill you--you have 3 lives--get confidence by surviving longer",0,50);
	text("To go to the next level, reach confidence level of 3 -- ALL THE BEST",150,70);
	pop();
	textSize(20);
	text(".........................................................................",250,30);

	if(frameCount % 250 === 0) {
		var obstacle = createSprite(1000,165,10,40);
		//obstacle.debug = true;
		//obstacle.velocityX = -(6 + 3*score/100);
		obstacle.velocityX = -5;
		obstacle.y = Math.round(random(250,500));
		
		//generate random obstacles
		var rand = Math.round(random(1,5));
		switch(rand) {
		  case 1: obstacle.addImage(villan1);
				  break;
		  case 2: obstacle.addImage(villan2);
				  break;
		  case 3: obstacle.addImage(villan3);
				  break;
		  case 4: obstacle.addImage(villan4);
				  break;
		  case 5: obstacle.addImage(villan5);
				  break;
		  
		  default: break;
		}
		
		//assign scale and lifetime to the obstacle           
		obstacle.scale = 0.4;
		obstacle.lifetime = 400;
		//add each obstacle to the group
		obstaclesGroup.add(obstacle);
	  }

	 
	
}

function level2(){

	lvl1b.addImage(building4);

	obstaclesGroup.destroyEach();

	push();
	fill("white");
	stroke("black");
	strokeWeight(4);
	textSize(20);
	text("LEVEL 2: Protect your mind your own thoughts!!",250,20);
	text(".........................................................................",250,30);
	strokeWeight(2);
	text("Good job!! You have developed enought confidence to fight bigger villans",130,70);
	pop();

	//positive thoughts
	if(frameCount % 500 === 0) {
		var positive = createSprite(1400,165,10,40);
		//positive.debug = true;
		//positive.velocityX = -(6 + 3*score/100);
		positive.velocityX = -2;
		positive.y = Math.round(random(250,500));
		
		//generate random positives
		var rand2 = Math.round(random(1,5));
		switch(rand2) {
		  case 1: positive.addImage(positive1);
				  break;
		  case 2: positive.addImage(positive2);
				  break;
		  case 3: positive.addImage(positive3);
				  break;
		  case 4: positive.addImage(positive4);
				  break;
		  case 5: positive.addImage(positive5);
				  break;
		  
		  default: break;
		}
		
		//assign scale and lifetime to the positive           
		positive.scale = 0.2;
		positive.lifetime = 700;
		//add each positive to the group
		positiveGroup.add(positive);
	  }

	  //negative thoughts
	  if(frameCount % 200 === 0) {
		var negative = createSprite(1400,165,10,40);
		//negative.debug = true;
		//negative.velocityX = -(6 + 3*score/100);
		negative.velocityX = -2;
		negative.y = Math.round(random(250,500));
		
		//generate random negatives
		var rand1 = Math.round(random(1,5));
		switch(rand1) {
		  case 1: negative.addImage(negative1);
				  break;
		  case 2: negative.addImage(negative2);
				  break;
		  case 3: negative.addImage(negative3);
				  break;
		  case 4: negative.addImage(negative4);
				  break;
		  case 5: negative.addImage(negative5);
				  break;
		  
		  default: break;
		}
		
		//assign scale and lifetime to the negative           
		negative.scale = 0.2;
		negative.lifetime = 700;
		//add each negative to the group
		negativeGroup.add(negative);
	  }

	  if(confidence===3){
		  gameState="win";
	  }

}

function gameOver(){

	push();
	background(gameOverImage);

	stroke("red");
	strokeWeight(2);
	fill("white");
	textSize(20);
	text("PRESS 'R' TO TRY AGAIN!! ELSE PRESS 'E' to END GAME",230,550);
	pop();

	if(keyDown("r")){
		life=3;
		confidence=0;
		gameState="intro";
		
	}

	if(keyDown("e")){
		gameState="end";
	}
}

function theEnd(){
	life=3;
	confidence=3;
	background(end);
}

function winner(){

	life=3;
	confidence=3;
	
	obstaclesGroup.destroyEach();
	positiveGroup.destroyEach();
	negativeGroup.destroyEach();

	//background(win);

	end1.visible=true;
	textSize(20);
	fill("teal");
	text("When life gets tough, GET TOUGHER!!",330,500);
	textSize(30);
	fill("red");
	stroke("red");
	strokeWeight(3);
	text("YOU ARE A WINNER!",370,550)
	
}