function target(event) {
	if (!npc.hasStoredData("x")) {
		var x = npc.getX();
		var y = npc.getY();
		var z = npc.getZ();
		npc.executeCommand("/playsound2 bossbattle2 loop @a " + x + " " + y + " " + z + " 7 1");
		npc.setStoredData("x",x);
		npc.setStoredData("y",y);
		npc.setStoredData("z",z);
		npc.setShowBossBar(1);
	}
}

function killed(event) {
	//Do the usual message stuff and music
	var playerL = npc.getSurroundingEntities(60,1);
	var player;
	var x = npc.getStoredData("x");
	var y = npc.getStoredData("y");
	var z = npc.getStoredData("z");

	try {
		player = playerL[0];
	}
	catch(err) {
		player = "this is weird, getSurroudingEntities works strangely so I have to do this workaround"
	}

	if (typeof player != 'string') {
		npc.executeCommand('/tellraw @a {color:"gold",bold:1,text:"'+player.getName()+' defeated the Lead Scientist!"}');
	}
	else {
		npc.executeCommand('/tellraw @a {color:"gold",bold:1,text:"The Lead Scientist was defeated!"}');
	}	
	npc.executeCommand('/playsound2 lol stop @a '+x+' '+y+' '+z);
	npc.executeCommand('/playsoundb victory normal @a[r=60]');
}