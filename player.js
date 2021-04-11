class Player{
constructor(){
this.name=null
this.distance=0
this.index=null
this.life=3
}

getPlayerCount(){
    var playerCountref=database.ref("playerCount");
    playerCountref.on("value" ,function(data){
      playerCount=data.val();
      console.log("player " + playerCount);
    });
}

updatePlayerCount(count){
    database.ref("/").update({
      playerCount:count
    });

}

updatePlayer(){
    var node="players/player"+this.index;
    database.ref(node).set({
      name:this.name,
      distance:this.distance,
      life:this.life
    });
}

static getAllPlayerDetails(){
    database.ref("players").on("value" ,function(data){
      allPlayers=data.val();
    });
}

}