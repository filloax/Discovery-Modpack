function init(event) {
	var bossid = "MutantCreatures.MutantZombie";
	
	npc.executeCommand('/summon2 '+bossid+' ~ ~ ~ {CustomName:"Lead Scientist",CustomNameVisible:0,PersistenceRequired:1}');
	var mobs = npc.getSurroundingEntities(1, 3);
	var boss;
	// npc.say(bossL[0].getMCEntity().func_94057_bL());
	if (mobs != null) {
		for (i=0;i<mobs.length;i++) {
			var bossCheck = mobs[i].getMCEntity();
			// npc.say(bossCheck.func_94057_bL());
			if (bossCheck.func_94057_bL() == "Lead Scientist")  { //getCustomNametag
				boss = bossCheck;
			}
		}
	}
	if (boss != undefined) {
		npc.setStoredData("id",boss.func_145782_y()); //getEntityId
	}
}

function update(event) {
	var boss = world.getMCWorld().func_73045_a(npc.getStoredData("id")); //getEntityById
	
	if (boss === null) {
		//Do the usual message stuff and music
		var x = npc.getStoredData("x");
		var y = npc.getStoredData("y");
		var z = npc.getStoredData("z");

		var players = npc.getSurroundingEntities(60,1);
		
		if (players != null) {
			var winners = players[0].getName();
			
			if (players.length >= 2) {
				for (i=1;i<(players.length-1);i++) {
					winners = winners + ", " + players[i].getName();
				}
				winners = winners + " and " + players[players.length-1].getName();
			} 
		
			npc.executeCommand('/tellraw @a {color:"gold",bold:1,text:"'+winners+' defeated the Lead Scientist!"}');
		} else {
			npc.executeCommand('/tellraw @a {color:"gold",bold:1,text:"The Lead Scientist was defeated!"}');
		}
		
		// npc.executeCommand('/playsound2 lol stop @a '+x+' '+y+' '+z);
		npc.executeCommand('/playsoundb musicchoices:bossvictory normal @a[r=60]')
		npc.despawn();
	} else {
		var health = boss.func_110143_aJ();
		var pos = boss.func_70666_h(1); //getPosition as vec3
		var x = pos.field_72450_a;
		var y = pos.field_72448_b;
		var z = pos.field_72449_c;
		npc.setPosition(x,y,z);
		// npc.say(health); //getHealth
		if (health == 0) {health = 1;}
		npc.setHealth(health);
	}
}

function target(event) {
	// if (npc.hasStoredData("x") && npc.hasStoredData("y") && npc.hasStoredData("z")) {
		// var x = npc.getX();
		// var y = npc.getY();
		// var z = npc.getZ();
		// npc.executeCommand("/playsound2 bossbattle2 loop @a " + x + " " + y + " " + z + " 7 1");
		// npc.setStoredData("x",x);
		// npc.setStoredData("y",y);
		// npc.setStoredData("z",z);
		// npc.setShowBossBar(1);
	// }
}

function damaged(event) {
	event.setCancelled(true);
}

function killed(event) {
}