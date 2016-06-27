//func_70040_Z get look Vector
//field_72450_a vector X
//field_72448_b vector Y
//field_72449_c vector Z

function init() {
	//check if source is behind target
	var isBehind = function(source,target) {
		var mcTarget = target.getMCEntity();
		var lookVec = mcTarget.func_70040_Z();
		var lx = lookVec.field_72450_a;
		var lz = lookVec.field_72449_c;
		var tx = target.getX();
		var tz = target.getZ();
		var sx = source.getX();
		var sz = source.getZ();
		
		//get the line perpendicular to the vector passing from target
		//r: z = mx + q
		var m = -(lx/lz);
		var q = tz - m*tx;
		
		//get if source is behind the line 
		if (lz > 0) {
			return sz < m * sx + q;
		} else {
			return sz > m * sx + q;
		}
	}
	var isBehindS = isBehind.toString();
	npc.setStoredData("isBehind",isBehindS);
	
	var getWeapon = function(key) {
		return world.createItem((key == "knife") ? "customnpcs:npcKukri" : "weaponmod:musketbayonet.diamond",0,1);
	}
	var getWeaponS = getWeapon.toString();
	npc.setStoredData("getWeapon",getWeaponS);
	
	var throwPearl = function(x,z,tx,tz) {
		var mx = (tx-x)/32;
		var my = 0.7
		var mz = (tz-z)/32;
		npc.executeCommand("/summon ThrownEnderpearl ~ ~3 ~ {Motion:["+mx+","+my+","+mz+"]}");
		npc.executeCommand("/playsound random.bow @a ~ ~ ~ 1.0 0.7");
	}
	var throwPearlS = throwPearl.toString();
	npc.setStoredData("throwPearl",throwPearlS);
	
	npc.setVisibleType(1);
	npc.clearPotionEffects();
	npc.setRetaliateType(3);
	npc.setRightItem(null);
	npc.setStoredData("drinkCount",0);
	npc.setMaxHealth(50);
	npc.setShowBossBar(0);
	
	npc.setStoredData("encounter",1);
	npc.setStoredData("phase","start");
}

//func_70635_at get entity senses
//func_75522_a can see 

function update(event) {
	var phase = npc.getStoredData("phase");
	
	var isBehindF = eval(npc.getStoredData("isBehind"));
	var getWeapon = eval(npc.getStoredData("getWeapon"));
		
	var playerL = npc.getSurroundingEntities(60,1);
	var player;
	try {
		player = playerL[0];
	}
	catch(err) {
		player = "this is weird, getSurroudingEntiteis works strangely so I have to do this workaround";
	}
	
	if (typeof player != "string") {
		if (phase == "sneaking") {
			var isBehind = isBehindF(npc,player);
			var canSee = npc.canSeeEntity(player);
			var drink = eval(npc.getStoredData("drink"));
			var drinkCount = npc.getStoredData("drinkCount");
			
			var escaping = npc.getTempData("escaping");
			var isNav = npc.isNavigating();
			var escaping = npc.getTempData("escaping");
			var mcNpc = npc.getMCEntity();
			var mcPlayer = player.getMCEntity();
			var dist = mcNpc.func_70032_d(mcPlayer); //get distance from player
			
			if (dist <= 1.5) {
				npc.clearNavigation();
				mcNpc.func_70652_k(mcPlayer); //attack
			} else if (dist <= 3) {
				npc.setRightItem(getWeapon("knife"));
			} else if (isBehind || !canSee || (drinkCount >=1 && drinkCount <= 24)) {  //if either covered, behind player, or almost visible
				npc.navigateTo( player.getX(),player.getY(),player.getZ(),0.7)
				npc.setTempData("escaping",false);
				npc.setRetaliateType(3);
			} else if (!isBehind && isNav && canSee && drinkCount > 24 && !escaping) { //if all above are false
				npc.clearNavigation();
				npc.setRetaliateType(2);
				npc.setTempData("escaping",true);
			} else if (escaping && !canSee) { //if the npc is escaping and behind cover
				npc.setTempData("escaping",false);
				npc.setRetaliateType(3);
				npc.addPotionEffect(2,2,7,true); //stop for 2 seconds
			}
			
			if (dist > 3 && npc.getRightItem() !== null) {
				npc.setRightItem(null);			
			}
			
			if ((drinkCount == 0 || drinkCount === null) && canSee) {
				// npc.say("drink");
				var oldItem = npc.getHeldItem();
				if (oldItem !== null) {
				} 
				npc.setRightItem(world.createItem("minecraft:potion",8206,1)); //potion of invisibility
				npc.setStoredData("drinkCount",1);
				npc.addPotionEffect(14,100000,0,false);
				npc.setVisibleType(1);
				npc.setTempData("escaping",false);
				npc.setRetaliateType(3);
				drinkCount++;
			}
			
			if (drinkCount == 2) {
				++drinkCount;
				npc.setRightItem(null);
			} else if (drinkCount == 30) {
				++drinkCount;
				npc.setVisibleType(0);
				npc.clearPotionEffects();
			} else if (drinkCount == 31) {
				drinkCount = 0;
			} else if (drinkCount >= 1) {
				++drinkCount;
			}
			npc.setStoredData("drinkCount",drinkCount);
		} else if (phase == "waiting") {
			var py = player.getY();
			var y = npc.getY();
			
			if (py >= y) {
				npc.setStoredData("phase","sneaking");
			}
		} else if (phase == "waitingEnd") {
			var py = player.getY();
			var y = npc.getY();
			if (py >= y) {
				npc.setStoredData("phase","final");
				npc.setRetaliateType(0);
				npc.setShowBossBar(1);		
				npc.executeCommand("/playsound2 bossbattle2 loop @a " + npc.getStoredData("finalx") + " " + npc.getStoredData("finaly") + " " + npc.getStoredData("finalz") + " 7 1");
				npc.setArrowResistance(1.5);
				npc.setMeleeResistance(1.5);
			}
		} else if (phase == "final") {
			var rand = Math.random();
			if (rand < 0.1) { //dynamite
				npc.swingHand();
				var x = npc.getX();
				var y = npc.getY();
				var z = npc.getZ();
				var px = player.getX();
				var py = player.getY();
				var pz = player.getZ();
				
				var dirx = (px-x)/30*1.6;
				var diry = 0.4
				var dirz = (pz-z)/30*1.6;
				
				var offx = (px-x > 0) ? Math.ceil((px-x)/100)*2 : Math.floor((px-x)/100)*2;
				var offz = (pz-z > 0) ? Math.ceil((pz-z)/100)*2 : Math.floor((pz-z)/100)*2;
				
				npc.executeCommand("/summon weaponmod.dynamite "+(x+offx)+" ~1 "+(z+offz)+" {Motion:["+dirx+","+diry+","+dirz+"],fuse:40}");
			} else if (rand >= 0.1 && rand < 0.2) { //landmine
				npc.swingHand();
				npc.executeCommand("/playsound customnpcs:misc.swosh @a");
				var x = npc.getX();
				var y = npc.getY();
				var z = npc.getZ();

				world.spawnClone(x+Math.floor(Math.random()*10-5),y,z+Math.floor(Math.random()*10-5),1,"Landmine") //spawn at +-5 x z
			} else if (rand >= 0.2 && rand < 0.3) { //spring
				npc.swingHand();
				npc.executeCommand("/playsound customnpcs:misc.swosh @a");
				var x = npc.getX();
				var y = npc.getY();
				var z = npc.getZ();

				world.spawnClone(x+Math.floor(Math.random()*10-5),y,z+Math.floor(Math.random()*10-5),1,"Spring") //spawn at +-5 x z
			} else if (rand >= 0.3 && rand < 0.4) {
				npc.swingHand();
				var block = world.createItem("ModpackStuff:mechanism",6,1);
				var x = npc.getX()+Math.floor(Math.random()*10-5);
				var y = npc.getY();
				var z = npc.getZ()+Math.floor(Math.random()*10-5);
				var mcWorld = world.getMCWorld();
				
				if (world.getBlock(x,y,z) === null) {world.setBlock(x,y,z,block)};
				//Sets the block ID and metadata at a given location. Args: X, Y, Z, new block ID, new metadata, flags. Flag 1 will cause a block update. Flag 2 will send the change to clients (you almost always want this). Flag 4 prevents the block from being re-rendered, if this is a client world. Flags can be added together. <--From MC Mapping Viewer, SetBlock description
				//Sets the blocks metadata and if set will then notify blocks that this block changed, depending on the flag. Args: x, y, z, metadata, flag. See setBlock for flag description <--From mappings, function used as other one didn't work and CNPC setblock deosn't set the corect Meta
				mcWorld.func_72921_c(x,y,z,6,2);
			}
			// npc.say(rand);
		}
	}
}

function kill(event) {
}

function interact(event) {
	npc.setStoredData("phase","final");
	npc.setVisibleType(0);
	npc.setRightItem(getWeapon(""));
	npc.setRetaliateType(0);
}

function damaged() {
	var getWeapon = eval(npc.getStoredData("getWeapon"));	
	
	var phase = npc.getStoredData("phase");
	var health = npc.getHealth();
	var dmg = event.getDamage();
	var lHealth = health-dmg;
	var encounter = npc.getStoredData("encounter");
	var throwPearl = eval(npc.getStoredData("throwPearl"));
	var source = event.getSource();

	if (phase == "attack" && lHealth <= 0 && encounter < 3) {
		event.setCancelled(true);
		npc.setHealth(50);
		npc.setRetaliateType(3);
		npc.setStoredData("encounter",++encounter);
		npc.setVisibleType(1);	
		npc.setRightItem(null);
				
		var success = false;
		var nx = npc.getX();
		var ny = npc.getY();
		var nz = npc.getZ();
		var x = nx - 4;
		var y = ny + 3;
		var z = nz - 4;
		
		for (i=0;i<7;i++) {
			for (j=0;j<9;j++) {
				for (k=0;k<9;k++) {
					var block = world.getBlock(x,y,z);
					var block1 = world.getBlock(x,y+1,z);
					var block2 = world.getBlock(x,y+2,z);
					
					if (block !== null && block1 === null && block2 === null) {
						if (block.getName() == "chisel:factoryblock" && block.getItemDamage() == 0) {
							npc.setPosition(x,y+1,z);
							npc.setStoredData("phase","waiting");
							throwPearl(nx,nz,x,z);
							success = true;
							break;
						}
					}
					
					x++;
				}
				x = nx - 4;
				z++;
			}
			z = nz - 4;
			y++
		}
		
		if (!success) {		
			x = npc.getX() - 4;
			y = npc.getY() - 1;
			z = npc.getZ() - 4;
			
			for (j=0;j<8;j++) {
				for (k=0;k<8;k++) {
					var block = world.getBlock(x,y,z);
					var block1 = world.getBlock(x,y+1,z);
					var block2 = world.getBlock(x,y+2,z);
					
					if (block !== null && block1 === null && block2 === null) {
						if (block.getName() == "chisel:factoryblock" && block.getItemDamage() == 0) {
							npc.setPosition(x,y+1,z);
							npc.setStoredData("phase","waiting");
							throwPearl(nx,nz,x,z);
							success = true;
							break;
						}
					}
					
					x++;
				}
				x -= 8;
				z++;
			}
		}
		
		if (!success) {
			npc.setStoredData("phase","sneaking");
		}
		// npc.say("ded");
	} else if (phase == "attack" && lHealth <= 0 && encounter == 3) {
		event.setCancelled(true);
		npc.setRetaliateType(3);
		npc.setVisibleType(1);
		npc.setMaxHealth(300);
		npc.setHealth(300);
		
		var success = false;
		var nx = npc.getX();
		var ny = npc.getY();
		var nz = npc.getZ();
		var x = nx - 4;
		var y = ny + 1;
		var z = nz - 4;
				
		for (i=0;i<10;i++) { //try to go in a block in area above
			for (j=0;j<9;j++) {
				for (k=0;k<9;k++) {
					var block = world.getBlock(x,y,z);
					var block1 = world.getBlock(x,y+1,z);
					var block2 = world.getBlock(x,y+2,z);
					
					if (block !== null && block1 === null && block2 === null) {
						if (block.getName() == "chisel:factoryblock" && block.getItemDamage() == 1) {
							npc.setPosition(x,y+1,z);
							npc.setStoredData("finalx",x);
							npc.setStoredData("finaly",y+1);
							npc.setStoredData("finalz",z);
							throwPearl(nx,nz,x,z);
							success = true;
							break;
						}
					}
					
					x++;
				}
				x = nx - 4;
				z++;
			}
			z = nz - 4;
			y++
		}
		var x = nx;
		var y = ny;
		var z = nz;
		if (!success) {
			for (i=0;i<50;i++) { //if that didn't work, try for blcks directly above but in a higher range
				var block = world.getBlock(x,y,z);
				var block1 = world.getBlock(x,y+1,z);
				var block2 = world.getBlock(x,y+2,z);
				
				if (block !== null) {
					if (block.getName() == "chisel:factoryblock" && block.getItemDamage() == 1) {
						if (block1 === null) {
							if (block2 === null) {
									npc.setPosition(x,y+1,z);
									npc.setStoredData("finalx",x);
									npc.setStoredData("finaly",y+1);
									npc.setStoredData("finalz",z);
									throwPearl(nx,nz,x,z);
									success = true;
									break;
							} else if (block2.getName() == "minecraft:snow_layer") {
									npc.setPosition(x,y+1,z);
									npc.setStoredData("finalx",x);
									npc.setStoredData("finaly",y+1);
									npc.setStoredData("finalz",z);
									throwPearl(nx,nz,x,z);
									success = true;
									break;
							}
						} else if (block1.getName() == "minecraft:snow_layer") {
							if (block2 === null) {
									npc.setPosition(x,y+1,z);
									npc.setStoredData("finalx",x);
									npc.setStoredData("finaly",y+1);
									npc.setStoredData("finalz",z);
									throwPearl(nx,nz,x,z);
									success = true;
									break;
							} else if (block2.getName() == "minecraft:snow_layer") {
									npc.setPosition(x,y+1,z);
									npc.setStoredData("finalx",x);
									npc.setStoredData("finaly",y+1);
									npc.setStoredData("finalz",z);
									throwPearl(nx,nz,x,z);
									success = true;
									break;
							}
						}
					}
					y++;
				}
			}
		}
		
		if (!success) { //if that still didn't work, settle down for his current position as a respawn point to rpevent crashes and don't teleport
						npc.setStoredData("finalx",nx);
						npc.setStoredData("finaly",ny);
						npc.setStoredData("finalz",nz);			
		}
		
		npc.setStoredData("phase","waitingEnd");		
		npc.setVisibleType(0);
		npc.setRightItem(getWeapon(""));
	} else if (phase == "waiting" || phase == "waitingEnd" || (phase == "sneaking" && !source.typeOf(1))) {
		event.setCancelled(true);
	} else if (phase == "sneaking" && source.typeOf(1)) {
		npc.setStoredData("phase","attack");
		npc.setStoredData("drinkCount",0);
		npc.setVisibleType(0);
		npc.clearPotionEffects();
		npc.setRightItem(getWeapon(""));
		npc.executeCommand("/playsound customnpcs:misc.swosh @a");
		npc.setRetaliateType(0);	
		if (lHealth <= 0) {
			event.setDamage(45);
		}
	} else if (phase == "final" && event.getType() == "fall") {
		event.setCancelled(true);
		npc.setPosition(npc.getStoredData("finalx"),npc.getStoredData("finaly"),npc.getStoredData("finalz"));
	}
}

function target(event) {
	if (npc.getStoredData("phase") == "start") {
		npc.setStoredData("phase","sneaking")
	}
}

function attack(event) {
	var getWeapon = eval(npc.getStoredData("getWeapon"));
	
	var phase = npc.getStoredData("phase");
	
	if (phase == "sneaking") {
		npc.setStoredData("phase","attack");
		npc.setStoredData("drinkCount",0);
		npc.setVisibleType(0);
		npc.clearPotionEffects();
		npc.setRightItem(getWeapon(""));
		npc.setRetaliateType(0);
		event.setDamage(15);
		npc.executeCommand("/playsound customnpcs:misc.swosh @a");
	}
}

function killed(event) {
	//Do the usual message stuff and then spawn a chest with some workarounds with the drop items, so they don't get exploded
	var playerL = npc.getSurroundingEntities(60,1);
	var player;
	var fx = Math.floor(npc.getStoredData("finalx"));
	var fy = Math.floor(npc.getStoredData("finaly"));
	var fz = Math.floor(npc.getStoredData("finalz"));

	var chest = world.createItem("chest",0,1);
	var mcWorld = world.getMCWorld();
	
	try {
		player = playerL[0];
	}
	catch(err) {
		player = "this is weird, getSurroudingEntiteis works strangely so I have to do this workaround"
	}

	if (typeof player != 'string') {
		npc.executeCommand('/tellraw @a {color:"gold",bold:1,text:"'+player.getName()+' defeated a scavenger!"}');
	}
	else {
		npc.executeCommand('/tellraw @a {color:"gold",bold:1,text:"A scavenger was defeated!"}');
	}	
	npc.executeCommand('/playsound2 lol stop @a '+fx+' '+fy+' '+fz);
	npc.executeCommand('/playsoundb victory normal @a[r=60]')
	npc.executeCommand('/setblock2 '+fx+' '+fy+' '+fz+' chest 0 replace {Items:[{id:ImmersiveEngineering:tool,Count:1},{id:ImmersiveEngineering:shaderBag,Count:2,tag:{rarity:"epic"}},{id:387,Count:1,Damage:0,Slot:2,tag:{author:"Scavenger",title:"Journal",pages:["10...\n....\nThis factory looks promising, and I sh\n\n15\n     I found an old revolver, still working\n\n19\nI lost it    damnit\n\n[Most of the journal is unreadable.]"]}}]}');
}