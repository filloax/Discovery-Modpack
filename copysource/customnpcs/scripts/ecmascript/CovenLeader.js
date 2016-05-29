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
}

var update() {
	var throwBack = eval(npc.getStoredData("throwBack"));
	var fill = eval(npc.getStoredData("fill"));
	var getRandArr = eval(npc.getStoredData("getRandArr"));
	
	var phase = npc.getStoredData("phase");
	var count = npc.getStoredData("count");
	var health = npc.getHealth();
	var maxHealth = npc.getMaxHealth();
	
	var ox = npc.getStoredData("ox");
	var oy = npc.getStoredData("oy");
	var oz = npc.getStoredData("oz");
	
	//////////////////
	//START
	//////////////////
	if (phase == "start") {
		//go to first phase when npc's health fully charges
		if (health == maxHealth) {
			count = 0;
			npc.setHealthRegen(1);
			npc.setCombatRegen(0);
			npc.setStoredData("phase","barrier1");
			// npc.say("phase barrier 1")
		} else {
			//Encase thrown players in barrier after a while
			if (count < 2) {
				count++;
			} else if (count == 2) {
				if (npc.hasTempData("thrownPlayers")) {
					var players = npc.getTempData("thrownPlayers");
					for (i=0;i<players.length;i++) {
						var px = players[i].getX();
						var py = players[i].getY();
						var pz = players[i].getZ();
						
						var barrierTicks = maxHealth/npc.getCombatRegen()*20;
						
						fill(px-2,py-2,pz-2,px+2,py+2,pz+2,"witchery:barrier",0,"{remainingTicks:"+barrierTicks+",blocksPlayers:1}");
						fill(px-1,py-1,pz-1,px+1,py+1,pz+1,"air",0,"",true,"witchery:barrier");
					}
				}
				count++;
			}
		}
	////////////////////
	//BOTH BARRIER PHASES
	////////////////////
	} else if (phase == "barrier1" || phase == "barrier2") {
		//Stay at starting position
		npc.setPosition(ox+0.5,oy,oz+0.5);
		
		//Get players and only do stuff if sat least 1 is found
		var players = npc.getSurroundingEntities(40,1);
		if (players !== null) {
			var px = players[0].getBlockX();
			var py = players[0].getBlockY();
			var pz = players[0].getBlockZ();
			var debug;
			if (players[0].getHeldItem() !== null) {
				debug = players[0].getHeldItem().getName() == "customnpcs:npcScripter" || players[0].getHeldItem().getName() == "customnpcs:npcWand" || players[0].getHeldItem().getName() == "customnpcs:npcMobCloner";
			}
			var barrierTicks = 200;
			
			///////////
			//SUMMONING
			///////////

			var countSummon = npc.getTempData("countSummon"); //This is another tempdata because it needs to be counted separately, yes ik this is getting spaghetti
															  //BTW it's for summoning mobs
			var maxCountSummon;
			if (!npc.hasTempData("maxCountSummon") || npc.getTempData("maxCountSummon") == "reset") {
				maxCountSummon = 3 + Math.random()*6;
			} else {
				maxCountSummon = npc.getTempData("maxCountSummon");
			}
			
			if (countSummon >= maxCountSummon && !debug) {
				maxCountSummon = "reset";
				countSummon = 0;
				
				//Summon stuff
				var rand = Math.random();
				// var qrand = Math.sqrt(rand ^ 2); //Module of rand
				// var vrand = rand / qrand; //Verse of rand
				
				//The x should go from 1 block behind player to 9 blocks in front,
				//the z +- 6 max, the y equal
				var x = px + 4 + rand*5;
				var y = py;
				var z = pz + rand*6 - 3;
				
				if (world.getBlock(x,y,z) === null) {
					world.spawnClone(x,y,z,1,(Math.random() < 0.5) ? "Hungry Zombie" : "Summoned Wraith");
				}
			} else {
				countSummon++;
			}
						
			////////////////
			//POTIONS
			///////////////
			
			var countPotion = npc.getTempData("countPotion"); //This is yet another tempdata for throwing potions
			var maxCountPotion; //Between 3 and 8 seconds
			
			//Effect item string
			var effects = [
			["{id:minecraft:glowstone_dust},{id:minecraft:stick}"],  //knockback
			["{id:minecraft:fermented_spider_eye},{id:minecraft:speckled_melon}"],  //hurting
			["{id:minecraft:fermented_spider_eye},{id:minecraft:sugar}"],  //slowness
			["{id:minecraft:spider_eye}"],  //poison
			["{id:witchery:ingredient,Damage:23}"]]; //demon heart, paralysis
						
			if (!npc.hasTempData("maxCountPotion") || npc.getTempData("maxCountPotion") == "reset") {
				maxCountPotion = 6 + Math.random()*10;
			} else {
				maxCountPotion = npc.getTempData("maxCountPotion");
			}
			
			if (countPotion >= maxCountPotion && !debug) {
				maxCountPotion = "reset";
				countPotion = 0;
								
				var command = '/summon2 witchery.brew2 '+(px+Math.random()*4-2)+' '+(oy+3)+' '+(pz+Math.random()*4-2)+' {Brew:{id:witchery:brewbottle,tag:{Splash:1,Color:'+(Math.random()*Math.pow(10, 8))+',EffectCount:1,Items:[{id:witchery:ingredient,Damage:22},{id:minecraft:nether_wart},{id:witchery:ingredient,Damage:37},'+getRandArr(effects)+',{id:minecraft:gunpowder}]}},Air:300,inTile:-1,xTile:-1,yTile:-1,zTile:-1,Motion:[0.0,0.1,0.0]}';
				
				// npc.executeCommand('/tellraw @a "'+command+'"');

				npc.executeCommand(command);
			} else {
				countPotion++;
			}
			
			//BARRIERS
			
			var maxCount;
			
			/////////////////////
			//FIRST BARRIER PHASE
			/////////////////////
			if (phase == "barrier1" && !debug) {
				//Set the time for the next barrier to appear to a random value between 1 and 3 seconds ()
				//if it isn't set
				if (!npc.hasTempData("maxCountBarrier") || npc.getTempData("maxCountBarrier") == "reset") {
					maxCount = 2 + Math.random()*4;
					// npc.executeCommand('/tellraw @a '+maxCount);
				} else {
					maxCount = npc.getTempData("maxCountBarrier");
				}
				
				//Place barrier and set maxcount to a random value (see above)
				if (count >= maxCount) {
					maxCount = "reset";
					count = 0;
					// npc.executeCommand('/tellraw @a barrier');
					
					//Actuall filling, make a 5x6x1 barrier that lasts 10 seconds 2 blocks in front of the player
					//Don't if the barrier would be over the npc
					if (px+2 != ox) {
						fill(px+2,py,pz-2,px+2,py+5,pz+2,"witchery:barrier",0,"{remainingTicks:"+barrierTicks+",blocksPlayers:1}");
					}
				} else {
				//Count upwards
					count++;
					// npc.executeCommand("/tellraw @a "+count);
				}
			/////////////////////
			//SECOND BARRIER PHASE
			/////////////////////
			} else if (phase == "barrier2" && !debug) {
				maxCount = 5;
				
				//Place barrier and set maxcount to a random value (see above)
				if (count >= maxCount) {
					// maxCount = "reset";
					count = 0;
					// npc.executeCommand('/tellraw @a barrier');
					
					//Make a room-width barrier that lasts 10 seconds with a random 3x3 opening
					//The barrier is placed in the nearest position divisible by 4
					
					var fillx = Math.ceil((px+2)/4)*4; //The x for the wall
					var openingz = oz+Math.random()*12-6;
					
					//Create barrier
					fill(fillx,oy-1,oz-9,fillx,oy+13,oz+9,"witchery:barrier",0,"{remainingTicks:"+barrierTicks+",blocksPlayers:1}");
					//Create opening
					fill(fillx,oy-1,openingz-1,fillx,oy+1,openingz+1,"air",0,"",true,"witchery:barrier");
				} else {
				//Count upwards
					count++;
					// npc.executeCommand("/tellraw @a "+count);
				}
			}
			
			npc.setTempData("maxCountSummon",maxCountSummon);
			npc.setTempData("countPotion",countPotion);
			npc.setTempData("maxCountPotion",maxCountPotion);
			npc.setTempData("countSummon",countSummon);
			npc.setTempData("maxCountBarrier",maxCount);
		}
	}
	
	npc.setStoredData("count",count);
}

function damaged(event) {
	var throwBack = eval(npc.getStoredData("throwBack"));
	var fill = eval(npc.getStoredData("fill"));
	
	var phase = npc.getStoredData("phase");
	var health = npc.getHealth();
	var maxHealth = npc.getMaxHealth();
	var hitcount = npc.getStoredData("hitcount");
	
	var ox = npc.getStoredData("ox");
	var oy = npc.getStoredData("oy");
	var oz = npc.getStoredData("oz");
	
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
		npc.setStoredData("phase","barrier2")
		npc.executeCommand('/tellraw @a barrier2')
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