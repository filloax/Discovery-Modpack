function init(event) {
	var bossid = "MutantCreatures.MutantZombie"
	
	npc.executeCommand('/summon '+bossid' ~ ~ ~ {CustomName:"Lead Scientist",CustomNameVisible:1,PersistenceRequired:1}');
	var bossL = npc.getSurroundingEntities(1, 3);
	var boss;
	// npc.say(bossL[0].getMCEntity().func_94057_bL());
	try {
		for (i=0;i<bossL.length;i++) {
			var bossCheck = bossL[i].getMCEntity();
			// npc.say(bossCheck.func_94057_bL());
			if (bossCheck.func_94057_bL() == "Lead Scientist")  { //getCustomNametag
				boss = bossCheck;
			}
		}
	}
	catch(err) {
		boss = "Weird workaround because getSurroundingEntities is buggy";
	}
	if (typeof boss != "string") {
		npc.setStoredData("id",boss.func_145782_y()); //getEntityId
	}
}

function update(event) {
	var boss = world.getMCWorld().func_73045_a(npc.getStoredData("id")); //getEntityById
	
	if (boss === null) {
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
		npc.executeCommand('/playsoundb victory normal @a[r=60]')
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
	if (npc.hasStoredData("x") && npc.hasStoredData("y") && npc.hasStoredData("z")) {
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

function damaged(event) {
	event.setCancelled(true);
}

function killed(event) {
}