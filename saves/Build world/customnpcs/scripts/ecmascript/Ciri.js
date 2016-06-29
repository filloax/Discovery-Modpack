////////////////////
//Update
var players = npc.getSurroundingEntities(5,1);
var count = npc.getStoredData("count");

if (players != null && players.length >= 1) {
	if (count < 1) {
		var helditemstack = players[0].getHeldItem();
		var helditem;
		if (helditemstack != null) {
			helditem = helditemstack.getName();
		}
		
		if (helditem != "customnpcs:npcScripter" && helditem != "customnpcs:npcMobCloner" && helditem != "customnpcs:npcWand") {
			npc.say("Wrong place, wrong time.");
					
			count = 1;
		}
	} else if (count > 0 && count < 7) {
		count++;
	} else if (count == 7) {
		var npcs = npc.getSurroundingEntities(50,2);
		
		if (npcs != null) {
			for (i=0;i<npcs.length;i++) {
				if (npcs[i].getName() == "Horse") {
					npcs[i].despawn();
				}
			}
		}
		
		npc.executeCommand("/playsoundb musicchoices:music.ciri normal @a[r=20] 0.8")
				
		npc.despawn();
	}
}

npc.setStoredData("count",count);