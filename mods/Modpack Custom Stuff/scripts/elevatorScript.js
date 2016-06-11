var itemCount = player.getItemCount('ModpackStuff:activator',0);
var currentItem = player.getItemName(player.getCurrentSlot());
var currentMeta = player.getItemMetadata(player.getCurrentSlot());
var oPos = new Position(position.x,position.y,position.z);

function dropBlock(pos) {
	var name = world.getBlockName(pos);
	if (name != "minecraft:air" && name != 'Thaumcraft:blockStairsGreatwood' && name != 'Thaumcraft:blockWoodenDevice') {
		world.harvestBlock(pos)
	}
}

function stairsAround(radius,sPos) {
	var pos = new Position(sPos.x,sPos.y,sPos.z);
	pos.x = sPos.x-radius;
	pos.z = sPos.z-radius;
	for (i = 0; i < 1 + 2 * radius; i++) {
		dropBlock(pos)
		world.setBlockAndMetadata(pos, 'Thaumcraft:blockStairsGreatwood',0);
		pos.z++;
	}
	pos.x = sPos.x+radius;
	pos.z = sPos.z-radius;
	for (i = 0; i < 1 + 2 * radius; i++) {
		dropBlock(pos)
		world.setBlockAndMetadata(pos, 'Thaumcraft:blockStairsGreatwood',1);
		pos.z++;
	}
	pos.x = sPos.x-radius;
	pos.z = sPos.z-radius;

	for (i = 0; i < 1 + 2 * radius; i++) {
		dropBlock(pos)
		world.setBlockAndMetadata(pos, 'Thaumcraft:blockStairsGreatwood',2);
		pos.x++;
	}
	pos.x = sPos.x-radius;
	pos.z = sPos.z+radius;
	for (i = 0; i < 1 + 2 * radius; i++) {
		dropBlock(pos)
		world.setBlockAndMetadata(pos, 'Thaumcraft:blockStairsGreatwood',3);
		pos.x++;
	}
}

function phase1() {
	stairsAround(1,position);
}

if(itemCount > 0 && currentItem == "ModpackStuff:activator" && currentMeta == 0) {
	if (player.isInCreative() == false) {
		player.remove('ModpackStuff:activator', 1, 0);
	}
	world.playSound("tile.piston.out",oPos,1.0,1.0);
	phase1()
	world.setBlockAndMetadata(oPos,'ModpackStuff:mechanism',2)
} else {
	player.sendMessage('The levitator seems deactivated.');
}