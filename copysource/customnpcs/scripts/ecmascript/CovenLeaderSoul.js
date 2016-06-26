//Update
var owId = npc.getStoredData("owId");
var owNpc = world.getMCWorld().func_73045_a(owId); //getEntityById

// npc.say("Loaded id:"+owId);
if (owNpc == null) {
	// npc.say("noo");
	var players = npc.getSurroundingEntities(60,1);
	if (players != null) {
		var player = players[0].getName();
		
		if (players.length >= 2) {
			for (i=1;i<(players.length-1);i++) {
				player = player + ", " + players[i].getName();
			}
			player = player + " and " + players[players.length-1].getName();
		} 
		
		// var playersdebug = ["Tizio","Caio","Sempronio"];
		// var player = playersdebug[0];
		
		// if (playersdebug.length >= 2) {
			// for (i=1;i<(playersdebug.length-1);i++) {
				// player = player + ", " + playersdebug[i];
			// }
			// player = player + " and " + playersdebug[playersdebug.length-1];
		// } 

		
		npc.executeCommand('/tellraw @a {color:"gold",bold:1,text:"'+player+' defeated the Coven Leader!"}');
	}
	else {
		npc.executeCommand('/tellraw @a {color:"gold",bold:1,text:"The Coven Leader was defeated!"}');
	}	
	npc.executeCommand('/playsoundb musicchoices:bossvictory normal @a[r=60]')
	npc.despawn();
}