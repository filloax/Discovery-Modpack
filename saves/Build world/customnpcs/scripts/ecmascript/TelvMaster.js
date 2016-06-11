function init(event){
	var iX = npc.getBlockX();
	var iY = npc.getBlockY();
	var iZ = npc.getBlockZ();
	var getRandomIntInclusive = "function(min, max) {\
		return Math.floor(Math.random() * (max - min + 1)) + min;\
	}"
	npc.setHome(iX+0.5,iY,iZ+0.5);
	npc.setStoredData("random",getRandomIntInclusive);
	npc.setStoredData("phase","statue");
	npc.setTempData("count",0);
}

function damaged(event){
	var phase = npc.getStoredData("phase");
	var health = npc.getHealth();
	var healthLeft = health - event.getDamage();
	var getRandom = eval(npc.getStoredData("random"));
	var hX = npc.getHomeX();
	var hY = npc.getHomeY();
	var hZ = npc.getHomeZ();
	var sX = npc.getX();
	var sY = npc.getY();
	var sZ = npc.getZ();
	
	npc.setTempData("count",0);
	
	if (phase == "startup" || phase == "statue" || event.getSource().getType() == 3) {
		event.setCancelled(true);
	} else if (phase != "end" && phase != "fall") {
		if (healthLeft > 30) {
			var runs = 0;
			var radius = 20;
			while (runs < 500) {
				var eX = hX + getRandom(-radius,radius);
				var eY = hY + getRandom (-1, radius);
				var eZ = hZ + getRandom(-radius,radius);
				var endBlock = world.getBlock(eX,eY,eZ);
				var endBlockUp1 = world.getBlock(eX,eY+1,eZ);
				var endBlockUp2 = world.getBlock(eX,eY+2,eZ);
				if (endBlock && !endBlockUp1 && !endBlockUp2 && endBlock.getName() != "reccomplex:generic_space") {
					npc.setPosition(eX,eY+1,eZ);
					npc.executeCommand("/playsound mob.endermen.portal @a " + sX + " " + sY + " " + sZ);
					break;
				}
			}
		} else {
			event.setDamage(0);
			npc.setHealth(10);
			npc.setStoredData("phase","end");
			npc.setPosition(hX,hY+2,hZ-20);
			npc.executeCommand("/playsound mob.endermen.portal @a " + sX + " " + sY + " " + sZ);
			// npc.say("test");
			npc.setArrowResistance(2.0);
			npc.setMeleeResistance(2.0);
			npc.setKnockbackResistance(0.0);
			npc.addPotionEffect(2,2147483647,7,true);
		}
	} else if (phase == "end") {
		npc.setArrowResistance(0.0);
		npc.setMeleeResistance(0.0);
		npc.setStoredData("phase","fall");
	} else {
		event.setDamage(100);
	}
}

function killed(event) {
	npc.setStoredData("phase","ded");
	var hX = npc.getHomeX();
	var hY = npc.getHomeY();
	var hZ = npc.getHomeZ();
	var book = world.createItem("ModpackStuff:TCAddonsTomes",0,1);
	var wand = world.createItem("Thaumcraft:WandCasting",0,1);
	wand.setTag("ordo",2500)
	wand.setTag("perditio",2500)
	wand.setTag("ignis",2500)
	wand.setTag("aqua",2500)
	wand.setTag("aer",2500)
	wand.setTag("terra",2500)
	var lootBag = world.createItem("Thaumcraft:ItemLootBag",2,2);
	npc.setPosition(hX,hY,hZ);
	npc.executeCommand('/playsound2 lol stop @a '+hX+' '+hY+' '+hZ);
	npc.executeCommand('/playsoundb victory normal @a[r=50]');
	
	npc.dropItem(book);
	npc.dropItem(wand);
	npc.dropItem(lootBag);
	
	var player;
	try {
		player = npc.getSurroundingEntities(50,1)[0];
	}
	catch(err) {
		player = "silly workaround"
	}
	if (typeof player != "string") {npc.executeCommand('/tellraw @a {color:"gold",bold:1,text:"'+player.getName()+' defeated the Telvanni Master!"}');}
	else {npc.executeCommand('/tellraw @a {color:"gold",bold:1,text:"The Telvanni Master was defeated!"}');}
}

function interact(event) {
	var shard = world.createItem("ModpackStuff:activator",1,1);
	var count = player.inventoryItemCount(shard);
	var phase = npc.getStoredData("phase");
	var x = npc.getHomeX()
	var y = npc.getHomeY()
	var z = npc.getHomeZ()
	if (phase == "statue") {
		if (count == 0) {
			player.sendMessage("§8§oYou hear a whisper: \"5...\"");
		} else if (count == 1) {
			player.sendMessage("§8§oYou hear a whisper: \"4...\"");
		} else if (count == 2) {
			player.sendMessage("§8§oYou hear a whisper: \"3...\"");
		} else if (count == 3) {
			player.sendMessage("§8§oYou hear a whisper: \"2...\"");
		} else if (count == 4) {
			player.sendMessage("§8§oYou hear a whisper: \"1...\"");
		} else {
			if (player.getMode() != 1) {
					player.removeItem(shard,5)
			}
			npc.executeCommand("/playsound mob.zombie.woodbreak @a " + x + " " + y + " " + z);
			npc.setTexture("customnpcs:textures/telvannicharge.png");
			npc.setStoredData("phase","startup");
			npc.setName("Veltanni Master");
			npc.setMaxHealth(300)
			npc.setHealthRegen(50);
			npc.setCombatRegen(50);
			npc.setShowBossBar(2);
			npc.executeCommand("/playsound2 bossbattle loop @a " + x + " " + y + " " + z + " 5 1");
		}
	}
}

function update(event) {
	var getRandom = eval(npc.getStoredData("random"));
	var rand = getRandom(0,20);
	var radius = getRandom(-5,5);
	var phase = npc.getStoredData("phase");
	var health = npc.getHealth();
	var attacking = npc.isAttacking();
	var proj = npc.getStoredData("proj");
	var aboutToThunder = npc.getTempData("thunder"); //Time left before lightning strike
	var aboutToFrost = npc.getTempData("frost"); //Time left before frost
	var count = npc.getTempData("count"); //Time left before return to home
	var playerL = npc.getSurroundingEntities(50,1);
	var player;
	try {
		player = playerL[0];
	}
	catch(err) {
		player = "dumb workaround again";
	}
	
	if (phase == "startup" && health == 300) {
		npc.setStoredData("phase","fight");
		npc.setRetaliateType(0);
		npc.setHealthRegen(1);
		npc.setTexture("customnpcs:textures/telvanni.png");
		npc.setCombatRegen(0);
	}
	
	if (typeof player != "string") {
		var pX = player.getX()
		var pY = player.getY()
		var pZ = player.getZ()
		if ((rand == 1 || rand == 2) && attacking && phase == "fight") {
			var X = npc.getX()+radius;
			var Y = npc.getY();
			var Z = npc.getZ()+radius;
			npc.executeCommand("/summon Skeleton " + X + " " + Y + " " + Z);
		} else if ((rand == 3 && attacking && phase == "fight") && !(aboutToThunder >= 1 || aboutToFrost >= 1)) {
			var aboutToThunder = 1;
			npc.setTempData("thunder",aboutToThunder);
			npc.setTempData("pPos", [pX,pY,pZ]);
			npc.executeCommand("/playsound shockrune @a " + pX + " " + pY + " " + pZ);
			
			// npc.say(player.getName());
		} else if ((rand == 4 && attacking && phase == "fight") && !(aboutToThunder >= 1 || aboutToFrost >= 1)) {

			var aboutToFrost = 1;
			npc.setTempData("Frost",aboutToFrost);
			npc.setTempData("pPos", [pX,pY,pZ]);
			npc.executeCommand("/playsound icerune @a " + pX + " " + pY + " " + pZ);
			
			// npc.say(player.getName());
		}
	}
	
	if (aboutToThunder == 4) {
		var pPos = npc.getTempData("pPos");
		world.thunderStrike(pPos[0],pPos[1],pPos[2]);
		npc.setTempData("thunder",0);
	} else if (aboutToThunder >= 1) {
		++aboutToThunder;
		npc.setTempData("thunder",aboutToThunder);
	}
	
	if (aboutToFrost == 3) {
		var pPos = npc.getTempData("pPos");
		var ice = world.createItem("ModpackStuff:slowIce",0,1);
		var air = world.createItem("air",0,1);
		var pos = [pPos[0]-1,pPos[1]-1,pPos[2]-1];
		for (i=0;i<3;i++) {
			for (j=0;j<3;j++) {			
				for (k=0;k<4;k++) {
					if (world.getBlock(pos[0],pos[1],pos[2]) == undefined) {
						world.setBlock(pos[0],pos[1],pos[2],ice);
					}
					pos[1]++
				}
				pos[1] = pPos[1]-1;
				pos[0]++;
			}
			pos[0] = pPos[0]-1;
			pos[2]++;
		}
		pos = [pPos[0],pPos[1],pPos[2]];
		
		for (i=0;i<2;i++) {
			var block = world.getBlock(pos[0],pos[1],pos[2]);
			if (block.getName() == "ModpackStuff:slowIce") {
				world.setBlock(pos[0],pos[1],pos[2],air);
			}
			pos[1]++;
		}
		
		npc.executeCommand("/playsound game.potion.smash @a "+pPos[0]+" "+pPos[1]+" "+pPos[2]+" 1.0 1.1");
		npc.setTempData("frost",0);
	} else if (aboutToFrost >= 1) {
		++aboutToFrost;
		npc.setTempData("frost",aboutToFrost);
	}
	
	if (phase == "end" && health > 30) {
		npc.setArrowResistance(1.0);
		npc.setMeleeResistance(1.0);
		npc.setKnockbackResistance(2.0);
		npc.setStoredData("phase","fight");
		npc.clearPotionEffects();
	}
	
	if (count == 100 && phase == "fight") {
		var hX = npc.getHomeX();
		var hY = npc.getHomeY();
		var hZ = npc.getHomeZ();
		npc.setPosition(hX,hY,hZ);	
		npc.executeCommand("/playsound mob.endermen.portal @a " + hX + " " + hY + " " + hZ);
		count = 0;
	} else {
			++count;
	}
	npc.setTempData("count",count);
	// npc.say(rand);
	
	if (phase == "fall") {
		if (health > 2) {
			npc.setHealth(health-2);
		} else {
			var hX = npc.getHomeX();
			var hY = npc.getHomeY();
			var hZ = npc.getHomeZ();
			var book = world.createItem("ModpackStuff:TCAddonsTomes",0,1);
			var wand = world.createItem("Thaumcraft:WandCasting",0,1);
			wand.setTag("ordo",2500)
			wand.setTag("perditio",2500)
			wand.setTag("ignis",2500)
			wand.setTag("aqua",2500)
			wand.setTag("aer",2500)
			wand.setTag("terra",2500)
			var lootBag = world.createItem("Thaumcraft:ItemLootBag",2,2);
			npc.setPosition(hX,hY,hZ);
			npc.executeCommand('/playsound2 lol stop @a '+hX+' '+hY+' '+hZ);
			npc.executeCommand('/playsoundb victory normal @a[r=50]');
			
			npc.dropItem(book);
			npc.dropItem(wand);
			npc.dropItem(lootBag);
			
			var player;
			try {
				player = npc.getSurroundingEntities(50,1)[0];
			}
			catch(err) {
				player = "silly workaround"
			}
			if (typeof player != "string") {
				npc.executeCommand('/tellraw @a {color:"gold",bold:1,text:"'+player.getName()+' defeated the Telvanni Master!"}');
			} else {
				npc.executeCommand('/tellraw @a {color:"gold",bold:1,text:"The Telvanni Master was defeated!"}');
			}
			npc.despawn();
		}
	}
}