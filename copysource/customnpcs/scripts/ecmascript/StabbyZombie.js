function attack(event) {
//When a player is attacked, make the boss lock onto him with the poppet

var target = event.getTarget();
var debugItem = target.getHeldItem();
var debug = (debugItem !== null) ? debugItem.getName() == "customnpcs:npcScripter" : false;

if (debug) {npc.say("My target:\""+target.getName()+"\"");}

if (target.typeOf(1) && npc.getStoredData("done") == 0) { //If npcs hasn't already done this and target is a player
	var npcs = npc.getSurroundingEntities(40,2)
	if (npcs != null) {
		for (i=0;i<npcs.length;i++) {
			var title = npcs[i].getTitle();
			if (debug) {
				npc.say("Boss title:\""+title+"\"");
				npc.say("Boss counter:\""+npcs[i].getTempData("pCount")+"\"")
			}
			if ((title == "CovenLeader" || title == "CovenLeader1") && npcs[i].getTempData("pCount") == 0) { //If the looped npc is the boss and isn't already targeting a player
				npc.executeCommand('/playsound stab @a[r=2]');
				npcs[i].setTempData("pCount",1);
				npcs[i].setTempData("pTarget",target);
				npc.setStoredData("done",1);

				if (debug) {
					npc.say("Boss found.")
					npc.say("Boss target:"+npcs[i].getTempData("pTarget").getName());
				}
			}
		}
	}
}
}