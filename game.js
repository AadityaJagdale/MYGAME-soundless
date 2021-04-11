class Game{
    constructor(){

    }

    getGameState(){
        var gameStateref=database.ref("gameState");
        gameStateref.on("value",function(data){
            gameState=data.val();
        });
    }


    updateGameState(state){
        database.ref("/").update({
            gameState:state
        });
    }

    async start(){
        if(gameState===0){
            playerObj=new Player();
            var pc=await database.ref("playerCount").once("value");
            if(pc.exists()){
                playerCount=pc.val();
                playerObj.getPlayerCount();
            }
            formObj=new Form();
            formObj.display();



        }

        bg=createSprite(width/2,height/2);
        bg.addImage(bgImage);
        bg.x=bg.width/2;
        rMM=createSprite(50,height*3/8);
        rMM.addAnimation("rMega",rMMImage);
        bMM=createSprite(50,height-75);
        bMM.addAnimation("bMega",bMMImage);
        invisibleG1= createSprite(width/2,height*3/8+rMM.height/2,width,10);
        invisibleG1.visible=false;
        

        invisibleG2=createSprite(width/2,height-5,width,10);
        invisibleG2.visible=false;

        obstacle1Group = createGroup();
        obstacle2Group = createGroup();


    }

    play(){
        formObj.hide();
        Player.getAllPlayerDetails();
        if(allPlayers){
            bg.velocityX=-4;
            if(bg.x<200){
                bg.x=bg.width/2;
            }
            if(keyDown(UP_ARROW) && playerObj.index===1 && rMM.collide(invisibleG1)){
                rMM.velocityY=-15;

            }

            rMM.velocityY=rMM.velocityY + 0.5

            if(keyDown("w") && playerObj.index===2 && bMM.collide(invisibleG2)){
                bMM.velocityY=-15;
            }

            bMM.velocityY=bMM.velocityY + 0.5

            this.spawnObstacles();

            if(rMM.isTouching(obstacle1Group)){
                playerObj.life=playerObj.life-1;
                obstacle1Group.destroyEach();
                playerObj.updatePlayer();
            }

            if(bMM.isTouching(obstacle2Group)){
                playerObj.life=playerObj.life-1;
                obstacle2Group.destroyEach();
                playerObj.updatePlayer();
            }

            if(allPlayers.player1.life<=0 || allPlayers.player2.life<=0){
                gameObj.updateGameState(2);

            }


        }
        rMM.collide(invisibleG1);
        bMM.collide(invisibleG2);


        drawSprites();

    }

    spawnObstacles(){
        if(frameCount %60 ===0){
            var obstacle1=createSprite(width,height*3/8,30,30);
            obstacle1.velocityX=-6;
            var obstacle2=createSprite(width,height-50,30,30);
            obstacle2.velocityX=-6;
            
            var rand=Math.round(random(1,2));
            switch(rand){
                case 1: obstacle1.addImage(o1Image);
                        obstacle2.addImage(o1Image);
                       break;
                case 2: obstacle1.addImage(o2Image);
                        obstacle2.addImage(o2Image);
                       break;
               default:break;
            }

            obstacle1.scale=0.7;
            obstacle2.scale=0.7;
            obstacle1.mirrorX(-1);
            obstacle2.mirrorX(-1);
            obstacle1.lifetime=width/6;
            obstacle2.lifetime=width/6;
            obstacle1Group.add(obstacle1);
            obstacle2Group.add(obstacle2);

            

        }
    }

    end(){
        var finalMsg=createElement("h1");
       // Player.getAllPlayerDetails();
        if(playerObj.life<=0){
        finalMsg.html("Better Luck Next Time :)");
        }
        else{
        finalMsg.html("Winner Winner Chicken Dinner ♥");
        }
        finalMsg.position(width/2-80,height/2);

        obstacle1Group.destroyEach();
        obstacle2Group.destroyEach();
        bg.velocityX=0;
        rMM.destroy();
        bMM.destroy();
    }


}