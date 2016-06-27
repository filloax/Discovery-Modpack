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
//FIGHT PHASES
////////////////////
} else if (phase == "barrier1" || phase == "barrier2" || phase == "giant") {
	//Stay at starting position
	if (phase == "barrier1" || phase == "barrier2") {
		npc.setPosition(ox+0.5,oy,oz+0.5);
		if (world.getBlock(ox,oy-1,oz) == null) {
			world.setBlock(ox,oy-1,oz,world.createItem("minecraft:bedrock",0,1));
		}
	}
	
	//Get players and only do stuff if at least 1 is found
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
		
		//Stay giant if npc is giant, effect 59 is resizing
		var resizing = 59;
		
		if (phase == "giant" && npc.getPotionEffect(59) == -1) {
			npc.addPotionEffect(59,100000,2,true);
		}
		
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
			
			//Choose between Hungry and Stabby Zombies or Wraiths during barrier phases, weaker undead witches in the giant phase
			var mob = (phase != "giant") ? ((Math.random() < 0.5) ? ((Math.random() < 0.2) ? "Stabby Zombie" : "Hungry Zombie") : "Summoned Wraith") : "Lesser Undead Witch";
			
			if (world.getBlock(x,y,z) === null) {
				world.spawnClone(x,y,z,1,mob);
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
			
			var cx = px+Math.random()*4-2;
			var cy = oy+1;
			var cz = pz+Math.random()*4-2;
			var command = '/summon2 witchery.brew2 '+cx+' '+cy+' '+cz+' {Brew:{id:witchery:brewbottle,tag:{Splash:1,Color:'+(Math.random()*Math.pow(10, 8))+',EffectCount:1,Items:[{id:witchery:ingredient,Damage:22},{id:minecraft:nether_wart},{id:witchery:ingredient,Damage:37},'+getRandArr(effects)+',{id:minecraft:gunpowder}]}},Air:300,inTile:-1,xTile:-1,yTile:-1,zTile:-1,Motion:[0.0,0.3,0.0]}';
			
			// npc.executeCommand('/tellraw @a "'+command+'"');

			npc.executeCommand(command);
			npc.executeCommand('/playsound magic.swosh @a '+cx+' '+cy+' '+cz);
		} else {
			countPotion++;
		}
		
		////////////////////
		//STABBY ZOMBIE / POPPET HANDLING
		////////////////////
		
		var pCount = npc.getTempData("pCount"); //counter for managing poppet magic
		var pTarget = npc.getTempData("pTarget"); //target for the magic
		
		if (pCount == 1) {			
			pCount++;
			world.spawnClone(ox-0.5,oy,oz+0.5,2,"Poppet"); //Summon the invisible npc that holds the poppet, as witch npcs cannot
		} else if (pCount == 4) {
			npc.swingHand();
			throwBack(pTarget, 0.4);
			npc.executeCommand('/playsound whoosh @a '+px+' '+py+' '+pz);
			pCount++;
		} else if (pCount == 7) {
			npc.swingHand();
			throwBack(pTarget, 0.4);
			npc.executeCommand('/playsound whoosh @a '+px+' '+py+' '+pz);
			pCount = 0;	
		} else if ((pCount > 1 && pCount < 4) || (pCount > 4 && pCount < 7)) {
			pCount++;
		}
		
		npc.setTempData("pCount",pCount);
		
		//////////
		//BARRIERS
		/////////
		
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
					npc.executeCommand('/playsound magic.wall @a '+(px+2)+' '+py+' '+pz);
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
				npc.executeCommand('/playsound magic.wall @a '+fillx+' '+oy+' '+openingz);
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
////////////////////////////
///////ESCAPE PHASE
///////////////////////////
//Check on the summoned dummy escaping npc, set health to his health, when he dies go to ghost phase after 3 seconds and summon the ghost
} else if (phase == "escape") {
	npc.setPosition(ox,oy,oz);
	if (world.getBlock(ox,oy-1,oz) == null) {
		world.setBlock(ox,oy-1,oz,world.createItem("minecraft:bedrock",0,1));
	}
	
	var esId = npc.getStoredData("esId");
	var esNpc = world.getMCWorld().func_73045_a(esId); //getEntityById
	// npc.say("Loaded id:"+esId);
	
	if (esNpc == null) {
		if (count < 6) {
			count++;
		} else {
			count=0;
			npc.setStoredData("phase","ghost");
			
			world.setBlock(ox+4,oy,oz,null);
			world.setBlock(ox+4,oy-1,oz,null);
			
			var ghNpc = world.spawnClone(ox-5,oy-1,oz,2,"Soul of the Coven Leader");
			npc.executeCommand('/playsound2 ghost.loop loop @a '+(ox-10)+' '+oy+' '+oz+' 3.0');
			var myId = npc.getMCEntity().func_145782_y(); //getEntityId
			ghNpc.setStoredData("owId",myId); 
			// npc.say("Stored id:"+myId);
		}
	} else {
		var esHealth = esNpc.func_110143_aJ(); //getHealth
		// npc.say(health); 
		if (esHealth == 0) {esHealth = 1;}
		npc.setHealth(esHealth);
	}
} else if (phase == "ghost") {	
	var players = npc.getSurroundingEntities(40,1);
	var poppet = world.createItem("ModpackStuff:activator",3,1);
	
	if (players !== null) {
		for (i=0;i<players.length;i++) {
			var count = players[i].inventoryItemCount(poppet);
			if (count > 0) {
				players[i].removeItem(poppet,count);
				npc.executeCommand('/playsoundb mob.ghast.fireball normal '+players[i].getName()+' 1 0.7');
				npc.executeCommand('/playsound2 ghost.loop stop @a '+(ox-10)+' '+oy+' '+oz);
				npc.despawn();
			}
		}
	}
}

npc.setStoredData("count",count);