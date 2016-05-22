function init(event) {
	var x = Math.floor(npc.getBlockX());
	var y = Math.floor(npc.getBlockY());
	var z = Math.floor(npc.getBlockZ());
	var block = world.createItem("ModpackStuff:landMine",1,1);
	var mcWorld = world.getMCWorld();
	
	if (world.getBlock(x,y,z) === null) {
		world.setBlock(x,y,z,block);
		//Sets the block ID and metadata at a given location. Args: X, Y, Z, new block ID, new metadata, flags. Flag 1 will cause a block update. Flag 2 will send the change to clients (you almost always want this). Flag 4 prevents the block from being re-rendered, if this is a client world. Flags can be added together. <--From MC Mapping Viewer, SetBlock description
		//Sets the blocks metadata and if set will then notify blocks that this block changed, depending on the flag. Args: x, y, z, metadata, flag. See setBlock for flag description <--From mappings, function used as other one didn't work and CNPC setblock deosn't set the corect Meta
		mcWorld.func_72921_c(x,y,z,1,2);
	}
}

function update(event) {
	var x = npc.getBlockX();
	var y = npc.getBlockY();
	var z = npc.getBlockZ();
	var block = world.getBlock(x,y,z);
	var count = npc.getTempData("count");
	
	if (block === null) {
		npc.despawn();
	} else if (block.getName() != "ModpackStuff:landMine") {
		npc.despawn();
	}
	if (count == 100) {
		world.removeBlock(x,y,z);
	} else {
		count++;
	}
	npc.setTempData("count",count);
}

function collide(event) {
	var x = npc.getBlockX();
	var y = npc.getBlockY();
	var z = npc.getBlockZ();
	
	world.explode(x,y,z,3,false,false);
	world.removeBlock(x,y,z);
}

function interact(event) {
	npc.say(world.getBlock(npc.getBlockYX(),npc.getBlockYY(),npc.getBlockYZ()).getName());
}

function damaged(event) {
	event.setCancelled(true);
}