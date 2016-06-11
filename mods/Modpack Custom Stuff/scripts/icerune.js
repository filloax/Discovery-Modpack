world.playSound("icerune",position,1.0,1.0);
world.setBlock(position, "minecraft:stonebrick");
player.attack(8);
player.addPotionEffect("moveSlowdown",400,1);
var pos = new Position(position.x,position.y+1,position.z);
for (i=0;i<50;i++) {
	pos.x = pos.x+Math.random();
	pos.z = pos.z+Math.random();
	world.spawnParticle("snowballpoof",pos,0.0,1.0,0.0);
	pos.x = position.x;
	pos.z = position.z;
}