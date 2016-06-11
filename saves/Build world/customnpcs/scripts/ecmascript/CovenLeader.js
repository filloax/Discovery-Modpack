function init() {
	//Variables starting with f are function locals
	
	//Throw players back
	var throwBack = function(player,strengthx,strengthy) {
		var fmcp = player.getMCEntity();
		if (!strengthx) {strengthx = 1}
		if (!strengthy) {strengthy = 1}
		
		//addVelocity(double,double,double)
		fmcp.func_70024_g(-3.5*strengthx,1.0*strengthy,Math.random()-0.5);
		//velocityChanged
		fmcp.field_70133_I = true;
	}
	npc.setStoredData("throwBack",throwBack.toString());
		
	//Fill from first coords to second coords with block of dmg and nbt
	//Replaces only specified block if specified
	var fill = function(x,y,z,x2,y2,z2,block,dmg,nbt,replaceSolid,replaceWhat,debug) {
		if (replaceSolid == undefined || replaceSolid === null) {replaceSolid = false;}
		if (debug == undefined || debug === null) {debug = false;}
		
		if (x2<x || y2<y || z2<z) {
			npc.say("Wrong usage of fill, the second coords should be higher!");
		} else {
			for (i=0;i<(x2-x+1);i++) {
				for (j=0;j<(y2-y+1);j++) {			
					for (k=0;k<(z2-z+1);k++) {
						var blockTest = world.getBlock(x+i,y+j,z+k);
						if (replaceSolid && blockTest !== null) {
							if (replaceWhat == undefined || replaceWhat === null || blockTest.getName() == replaceWhat) {
								npc.executeCommand("/setblock "+(x+i)+" "+(y+j)+" "+(z+k)+" "+block+" "+dmg+" replace "+nbt);
							}
							if (debug) {npc.say(block);}
						} else if (blockTest === null) {
							npc.executeCommand("/setblock "+(x+i)+" "+(y+j)+" "+(z+k)+" "+block+" "+dmg+" replace "+nbt);
							if (debug) {npc.say(block);}							
						}
					}
				}
			}
		}
	}
	npc.setStoredData("fill",fill.toString());
	
	var getRandArr = function(array) {
		return(array[Math.floor(Math.random()*array.length)]);
	}
	npc.setStoredData("getRandArr",getRandArr.toString());
	
	var players = npc.getSurroundingEntities(10,1);
	if (players !== null) {
		for (i=0;i<players.length;i++) {
			throwBack(players[i]);
		}
	}
	npc.setTempData("thrownPlayers",players);
	
	npc.setStoredData("count",0);
	npc.setStoredData("phase","start");
	npc.setStoredData("hitcount",0);
	npc.setHealth(1);
	npc.setCombatRegen(50);
	npc.setHealthRegen(50);
	npc.setTempData("maxCountBarrier","reset");
	npc.setStoredData("ox",npc.getBlockX());
	npc.setStoredData("oy",npc.getBlockY());
	npc.setStoredData("oz",npc.getBlockZ());
	npc.setTempData("pCount",0);
	npc.clearPotionEffects();
	npc.setRetaliateType(3);
	npc.setVisibleType(0);
}

var update() {
////IN UPDATE FILE
}

function damaged(event) {
	var throwBack = eval(npc.getStoredData("throwBack"));
	var fill = eval(npc.getStoredData("fill"));
	
	var phase = npc.getStoredData("phase");
	var health = npc.getHealth()-event.getDamage();
	var maxHealth = npc.getMaxHealth();
	var hitcount = npc.getStoredData("hitcount");
	
	var ox = npc.getStoredData("ox");
	var oy = npc.getStoredData("oy");
	var oz = npc.getStoredData("oz");
	
	if (event.getSource() == null || event.getSource().getType() != 1 || phase == "escape" || phase == "ghost") {
		event.setCancelled(true);
	}
	
	if (health <= 0) {
		event.setCancelled(true);
		health = 1;
		npc.setHealth(health);
	}
	
	if (phase == "barrier1" || phase == "barrier2") {
		if (hitcount < 1) {
			hitcount++
		} else {
			var nearbyPlayers = npc.getSurroundingEntities(10,1);
			
			if (nearbyPlayers != null) {
				for (i=0;i<nearbyPlayers.length;i++) {					
					nearbyPlayers[i].setPosition(ox-26.5,oy-1,oz+0.5);
					npc.executeCommand("/playsound mob.endermen.portal @a " + ox-27 + " " + oy-1 + " " + oz);
					
					// npc.executeCommand('/tellraw @a "teleporting '+nearbyPlayers[i].getName()+' to '+(ox-27)+' '+(oy-1)+' '+oz+'"');
				}
			}

			hitcount = 0;
		}
	}
	
	if (health < maxHealth/3*2 && phase == "barrier1") {
		npc.setStoredData("phase","barrier2");
		// npc.executeCommand('/tellraw @a barrier2')
	} else if (health < maxHealth/3 && phase == "barrier2") {
		npc.setStoredData("phase","giant");
		npc.setRetaliateType(0);
	} else if (health < maxHealth/15 && phase == "giant") {
		npc.setStoredData("phase","escape");
		npc.setRetaliateType(3);
		npc.setPosition(ox,oy,oz);
		npc.setVisibleType(1);
		npc.clearPotionEffects();
		npc.setStoredData("count",0);
		
		var esNpc = world.spawnClone(ox-5,oy-1,oz,2,"Escaping Coven Leader");
		var esId = esNpc.getMCEntity().func_145782_y(); //getEntityId
		npc.setStoredData("esId",esId); 
		// npc.say("Stored id:"+esId);
	}
	
	// npc.say("ouch "+hitcount);
	npc.setStoredData("hitcount",hitcount);	
}

function interact() {
	// var throwBack = eval(npc.getStoredData("throwBack"));
	// var fill = eval(npc.getStoredData("fill"));
	
	// var x = npc.getX();
	// var y = npc.getY();
	// var z = npc.getZ();
	
	// fill(x-1,y+3,z-1,x+1,y+4,z+1,"ModpackStuff:slowIce",0,"",false);
}