var count = world.getTileEntityIntData(position, "count");
++count;
var decay = world.getTileEntityIntData(position, "decay");
++decay;

position.x += 0.5;
position.z += 0.5;

if (Math.random() < 0.1) {
	world.spawnParticle("flame",position.x+Math.random()-0.5,position.y+0.5+Math.random()-0.5,position.z+Math.random()-0.5,0,0,0);
}

position.y++;
if (count==70) {
	if (Math.random() < 0.5) {
		world.spawnMob(position,"Zombie");		
	} else {
		world.spawnMob(position,"Creeper");		
	}
	count = 0;
}
position.y--;
position.x -= 0.5;
position.z -= 0.5;

if (decay == 400) {
	world.setBlock(position,"minecraft:air");
}
world.setTileEntityIntData(position, "count", count);
world.setTileEntityIntData(position, "decay", decay);