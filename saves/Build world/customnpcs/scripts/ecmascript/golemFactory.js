function init(event) {
	var x = Math.floor(npc.getBlockX());
	var y = Math.floor(npc.getBlockY());
	var z = Math.floor(npc.getBlockZ());
	var block = world.createItem("discoveryjar:golemGen",1,0);
	var mcWorld = world.getMCWorld();
	
	if (world.getBlock(x,y,z) === null) {
		world.setBlock(x,y,z,block);
	}
	
	npc.setTempData("count",8);
	npc.setStoredData("maxcount",10);
	
	function despawnDrop() {
		var chances = [1,0.6,0.4,0.4,0.15,0.15,0.01]
		var drops = ["minecraft:iron_block","minecraft:iron_ingot","RotaryCraft:rotarycraft_item_enginecraft","RotaryCraft:rotarycraft_item_enginecraft","RotaryCraft:rotarycraft_item_gearunits","RotaryCraft:rotarycraft_item_gearunits","RotaryCraft:rotarycraft_item_shaftcraft"];
		var damage = [0,0,10,9,4,0,4];
		
		for (i=0;i<7;i++) {
			
			if (Math.random() <= chances[i]) {
				npc.dropItem(world.createItem(drops[i],damage[i],1));
			}
		}		
		
		npc.despawn();
	}
	npc.setStoredData("despawn",despawnDrop.toString());
}

function update(event) {
	var x = npc.getBlockX();
	var y = npc.getBlockY();
	var z = npc.getBlockZ();
	var block = world.getBlock(x,y,z);
	var count = npc.getTempData("count");
	var maxcount = npc.getStoredData("maxcount"); //time atwhich golem spawns, between 8(4sec) and 12 (6sec)
	var cooldown = npc.getTempData("cooldown"); //time in which the factory is on even when there are no players nearby, starts at 80 when a players comes nearby
	
	var despawnDrop = eval(npc.getStoredData("despawn"));
	
	if (block === null) {
		despawnDrop();
	} else if (block.getName() != "discoveryjar:golemGen") {
		despawnDrop();
	}
	
	var players = npc.getSurroundingEntities(5,1);
	var playersnearby = players !== null && players.length > 0;
	
	if (playersnearby || cooldown > 0) {
		if (playersnearby) {
			cooldown = 80;
		} else if (cooldown > 0) {
			--cooldown;
		}
		
		if (count >= maxcount) {
			var golem; 
			if (world.getBlock(x-1,y,z) == null) { //spawn golem in free space nearby
				golem = world.spawnClone(x-1,y,z,1,"Clockwork Golem");
			} else if (world.getBlock(x+1,y,z) == null) {
				golem = world.spawnClone(x+1,y,z,1,"Clockwork Golem");
			} else if (world.getBlock(x,y,z-1) == null) {
				golem = world.spawnClone(x,y,z-1,1,"Clockwork Golem");
			} else if (world.getBlock(x,y,z+1) == null) {
				golem = world.spawnClone(x,y,z+1,1,"Clockwork Golem");
			}
			
			if (golem != undefined) {
				golem.setStoredData("factory",1);
				
				var rand = Math.random()*3;
				var INT_MAX = 2147483647;
				
				if (rand < 1) { //set golem size and power randomly
					golem.setSize(2);
					golem.setMeleeStrength(6);
				} else if (rand > 2 && rand < 3){
					golem.setSize(4);
					golem.setMeleeStrength(10);
				}
			}
			count = 0;
			maxcount = 7 + Math.random()*4;
		} else {
			count++;
		}
		
	}
	
	// npc.executeCommand("/tellraw @a \"cool:"+cooldown+" count:"+count+" nearbyplayers:"+playersnearby+"\"");
	
	npc.setTempData("count",count);
	npc.setStoredData("maxcount",maxcount);
	npc.setTempData("cooldown",cooldown);
}

function damaged(event) {
	event.setCancelled(true);
}