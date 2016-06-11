//Update
var owId = npc.getStoredData("owId");
var owNpc = world.getMCWorld().func_73045_a(owId); //getEntityById

// npc.say("Loaded id:"+owId);
if (owNpc == null) {
	// npc.say("noo");
	var players = npc.getSurroundingEntities(60,1);
	if (players != null) {
		npc.executeCommand('/tellraw @a {color:"gold",bold:1,text:"'+players[0].getName()+' defeated the Coven Leader!"}');
	}
	else {
		npc.executeCommand('/tellraw @a {color:"gold",bold:1,text:"The Coven Leader was defeated!"}');
	}	
	npc.executeCommand('/playsoundb musicchoices:bossvictory normal @a[r=60]')
	npc.despawn();
}