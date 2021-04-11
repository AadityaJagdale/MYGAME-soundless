class Form{
    constructor(){
        this.button=createButton("play")
        this.title=createElement("h1")
        this.greeting=createElement("h2")
        this.input=createInput("Name")
    }

    display(){
        this.title.html("MY GAME");
        this.title.position(width/2-100,0);
        this.input.position(width/2-100,height/2-100);

        this.button.position(width/2-40,height/2);
        this.button.mousePressed(()=>{
            console.log(this);
            this.input.hide();
            this.button.hide();
            playerObj.name=this.input.value();
            playerCount=playerCount+1;
            console.log(playerCount);
            playerObj.index=playerCount;
            playerObj.updatePlayerCount(playerCount);
            playerObj.updatePlayer();
            this.greeting.position(width/2-80,height/3);
            this.greeting.html("WELCOME "+playerObj.name);
        });
    }

    hide(){
        this.button.hide();
        this.greeting.hide();
        this.title.hide();
        this.input.hide();
    }

    

    
}