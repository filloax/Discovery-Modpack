function init() {
	var x = npc.getBlockX();
	var y = npc.getBlockY();
	var z = npc.getBlockZ();
	var lx = x-1; //Coords used in loops
	var ly = y-1;
	var lz = z-1;
	
	for (i=0;i<3;i++) {
		for (j=0;j<3;j++) {
			for (k=0;k<3;k++) {
				var block = world.getBlock(lx,ly,lz);
				if (block != null) {
					// npc.say(block.getName() + ";" + block.getItemDamage());
					if (block.getName() == "witchery:coffinblock" && block.getItemDamage() == 3) {
						x = lx + 0.9;
						y = ly + 0.5;
						z = lz + 0.5;
						// npc.say("found");
						break;
					}
				}
				lx++;
			}
			lx = x-1;
			ly++;
		}
		ly = y-1;
		lz++;
	}
	
	npc.setStoredData("x",x);
	npc.setStoredData("y",y);
	npc.setStoredData("z",z);
}

function update() {
	var poppet = world.createItem("ModpackStuff:activator",2,1);
	var x = npc.getStoredData("x"); //Starting coords for staying still in the coffin
	var y = npc.getStoredData("y");
	var z = npc.getStoredData("z");
	var ox = x-0.9; //Coords used in loops / base coords with no float value
	var oy = y-0.5;
	var oz = z-0.5;
	var lx = ox; //Used in loops
	var ly = oy;
	var lz = oz;
	var playerL = npc.getSurroundingEntities(20,1);
	var player;
	try {
		player = playerL[0];
	}
	catch(err) {
		player = "this is weird, getSurroudingEntities works strangely so I have to do this workaround";
	}
	
	npc.setPosition(x,y,z);
	
	if (world.getBlock(lx,ly,lz) == null) {npc.executeCommand("/setblock "+lx+" "+ly+" "+lz+" ModpackStuff:unbreakSlab")}
	if (world.getBlock(lx+1,ly,lz) == null) {npc.executeCommand("/setblock "+(lx+1)+" "+ly+" "+lz+" ModpackStuff:unbreakSlab")}
	
	if (typeof player != "string") {
		var count = player.inventoryItemCount(poppet);
		if (count > 0) {
			player.removeItem(poppet,1);
			npc.say("Muahaha");
			world.setBlock(lx,ly,lz,null);
			world.setBlock(lx+1,ly,lz,null);
			lx -= 2;
			ly -= 2;
			lz -= 2;
			
			for (i=0;i<5;i++) {
				for (j=0;j<5;j++) {
					var block = world.getBlock(lx,ly,lz);
					if (block == null) {
						// npc.say("test;"+lx+";"+ly+";"+lz);
						npc.executeCommand("/setblock "+lx+" "+ly+" "+lz+" witchery:barrier 0 replace {remainingTicks:200,blocksPlayers:1}")
					}
					ly++;
				}
				ly = y-1;
				lz++;
			}
			
			ly = oy - 2;
			lz = oz - 2;
			for (i=0;i<5;i++) {
				for (j=0;j<5;j++) {
					var block = world.getBlock(lx,ly,lz);
					if (block == null) {
						// npc.say("test;"+lx+";"+ly+";"+lz);
						npc.executeCommand("/setblock "+lx+" "+ly+" "+lz+" witchery:barrier 0 replace {remainingTicks:200,blocksPlayers:1}")
					}
					ly++;
				}
				ly = y-1;
				lx++;
			}
			
			lx = ox + 2;
			ly = oy - 2;
			lz = oz + 2;
			for (i=0;i<5;i++) {
				for (j=0;j<5;j++) {
					var block = world.getBlock(lx,ly,lz);
					if (block == null) {
						// npc.say("test;"+lx+";"+ly+";"+lz);
						npc.executeCommand("/setblock "+lx+" "+ly+" "+lz+" witchery:barrier 0 replace {remainingTicks:200,blocksPlayers:1}")
					}
					ly++;
				}
				ly = y-1;
				lx--;
			}
			
			ly = oy - 2;
			lx = ox - 2;			
			for (i=0;i<5;i++) {
				for (j=0;j<5;j++) {
					var block = world.getBlock(lx,ly,lz);
					if (block == null) {
						// npc.say("test;"+lx+";"+ly+";"+lz);
						npc.executeCommand("/setblock "+lx+" "+ly+" "+lz+" witchery:barrier 0 replace {remainingTicks:200,blocksPlayers:1}")
					}
					ly++;
				}
				ly = y-1;
				lz--;
			}
			
			var telePlayers = npc.getSurroundingEntities(10,1); //players to teleport out
			var testPlayer; //still that weird workaround as when there is no player it goofs out
			try {
				testPlayer = telePlayers[0];
			}
			catch(err) {
				testPlayer = "this is weird, getSurroudingEntities works strangely so I have to do this workaround";
			}
			
			//Teleport all players inside the forcefield outside of it
			if (typeof testPlayer != "string") { 
				for (i=0;i<telePlayers.length;i++) {
					var py = telePlayers[i].getY();
					var pz = telePlayers[i].getZ();
					var mcp = telePlayers[i].getMCEntity();
					var mcnpc = telePlayers[i].getMCEntity();
					
					
					//If player is inside field, func is getDistanceToEntity
					if (mcnpc.func_70032_d(mcp) < 4.3) {
						// npc.say(telePlayers[i].getName());
						
						//Teleport player a little behind the barrier
						telePlayers[i].setPosition(ox - 3.5,py,pz);
					}
				}
			}

			world.spawnClone(x-0.5,y-1,z,"1","Coven Leader");
			npc.despawn();
		}
	}
}