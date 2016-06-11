world.playSound("firerune",position,1.0,1.0);
world.setBlock(position, "minecraft:stonebrick");
player.attack(8);
var pos = new Position(position.x-1,position.y-1,position.z-1);
for (i=0;i<3;i++) {
	for (j=0;j<3;j++) {
		for (k=0;k<3;k++) {
			if (world.getBlockName(pos) == "minecraft:air") {
				world.setBlock(pos,"minecraft:fire");
			}
			pos.x++;
		}
		pos.x=position.x-1;
		pos.y++
	}
	pos.y=position.y-1;
	pos.z++;
}