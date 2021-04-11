var database;
var gameObj,formObj,playerObj;
var playerCount,gameState=0;
var allPlayers;
var bg,bgImage;
var bMM,bMMImage;
var rMM,rMMImage;
var invisibleG1,invisibleG2;
var o1,o1Image;
var o2,o2Image;
var obstacle1Group, obstacle2Group;

function preload(){
bgImage=loadImage("images/bkg.jpg");
bMMImage=loadAnimation("images/b1.png","images/b2.png","images/b3.png","images/b4.png","images/b5.png","images/b6.png","images/b7.png","images/b8.png");
rMMImage=loadAnimation("images/r1.png","images/r2.png","images/r3.png","images/r4.png","images/r5.png","images/r6.png","images/r7.png","images/r8.png");

o1Image=loadImage("images/m1.png");
o2Image=loadImage("images/m2.png");


}

function setup(){
    createCanvas(displayWidth-30,displayHeight-135);
    console.log(width);
    console.log(height);
    database=firebase.database();
    gameObj=new Game();
    gameObj.getGameState();
    gameObj.start();

    

}

function draw(){
    if(playerCount===2 && gameState===0){
    gameObj.updateGameState(1);
    
    }

    if(gameState===1){
        gameObj.play();
    }

    if(gameState===2){
        gameObj.end();
    }

}

