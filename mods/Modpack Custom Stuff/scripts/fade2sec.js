//Removes block after 2 sec and replaces block behind with lapis caelestis gray if it was modpackstuff's lapis caelestis
var count = world.getTileEntityIntData(position, "count");
++count;
if (count==40) {
	world.setBlock(position,"minecraft:air");
	position.x++;
	if (world.getBlockName(position) == "ModpackStuff:unbreakBlock" && world.getBlockMetadata(position) == 2) {
		world.setBlockAndMetadata(position,"ExtraUtilities:greenscreen",7);
	}
}
world.setTileEntityIntData(position, "count", count);