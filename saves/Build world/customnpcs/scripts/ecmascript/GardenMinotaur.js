function target(event) {
	if (!npc.hasStoredData("x")) {
		var x = npc.getX();
		var y = npc.getY();
		var z = npc.getZ();
		npc.executeCommand("/playsound2 bossbattle loop @a " + x + " " + y + " " + z + " 7 1");
		npc.setStoredData("x",x);
		npc.setStoredData("y",y);
		npc.setStoredData("z",z);
		npc.setShowBossBar(1);
	}
}

function init() {
	npc.clearStoredData();
}

function update() {
	if (npc.isAttacking()) {
		var rand = Math.random();
		if (rand < 0.2) {
			var playerL = npc.getSurroundingEntities(60,1);
			var player;
			try {
				player = playerL[0];
			}
			catch(err) {
				player = "this is weird, getSurroudingEntities works strangely so I have to do this workaround"
			}

			if (typeof player != 'string') {
				var px = player.getX();
				var pz = player.getZ();
				var x = npc.getX();
				var z = npc.getZ();
				var lookVec = npc.getMCEntity().func_70040_Z();
				var lx = lookVec.field_72450_a;
				var lz = lookVec.field_72449_c;
				
				var dirx = (px-x)/30*1.6;
				var dirz = (pz-z)/30*1.6;
				
				var offx = lx*2;
				var offz = lz*2;

				npc.swingHand();
				npc.executeCommand('/summon2 Botania.botania:manaBurst ~'+offx+' ~1.5 ~'+offz+' {Air:300,color:2162464,inTile:-1,mana:100,manaLossTick:4,minManaLoss:40,spreaderY:-1,startingMana:100,xTile:-1,yTile:-1,zTile:-1,Motion:['+dirx+',0,'+dirz+'],lensStack:{Count:1,Damage:0,id:Botania:terraSword,tag:{attackerUsername:Minotaur}},lastMotionX:'+dirx+',lastMotionY:0,lastMotionZ:'+dirz+'}');
			}
		}
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
		npc.executeCommand('/tellraw @a {color:"gold",bold:1,text:"'+player.getName()+' defeated the Garden Keeper!"}');
	}
	else {
		npc.executeCommand('/tellraw @a {color:"gold",bold:1,text:"The Garden Keeper was defeated!"}');
	}	
	npc.executeCommand('/playsound2 lol stop @a '+x+' '+y+' '+z);
	npc.executeCommand('/playsoundb victory normal @a[r=60]');
}

function damaged(event){
	var source = event.getSource();
	if (source.getType() != 1) {
		event.setCancelled(true);
	}
}