var count = world.getTileEntityIntData(position, "count");
++count;
if (count==100) {
	world.setBlock(position,"minecraft:air");
}
world.setTileEntityIntData(position, "count", count);