var count = world.getTileEntityIntData(position,"count");
var oPos = new Position(position.x,position.y,position.z);
var entities = world.enumEntities(oPos,5,"hostile,animal,mob,player");
var eLenght = entities.length;
	
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

function planksAround(radius,sPos) {
	var pos = new Position(sPos.x,sPos.y,sPos.z);
	
	pos.x = sPos.x-radius;
	pos.z = sPos.z-radius;
	for (i = 0; i < 1 + 2 * radius; i++) {
		dropBlock(pos)
		world.setBlockAndMetadata(pos, 'Thaumcraft:blockWoodenDevice',6);
		pos.z++;
	}
	
	pos.x = sPos.x+radius;
	pos.z = sPos.z-radius;
	for (i = 0; i < 1 + 2 * radius; i++) {
		dropBlock(pos)
		world.setBlockAndMetadata(pos, 'Thaumcraft:blockWoodenDevice',6);
		pos.z++;
	}
	
	pos.x = sPos.x-radius;
	pos.z = sPos.z-radius;
	for (i = 0; i < 1 + 2 * radius; i++) {
		dropBlock(pos)
		world.setBlockAndMetadata(pos, 'Thaumcraft:blockWoodenDevice',6);
		pos.x++;
	}
	
	pos.x = sPos.x-radius;
	pos.z = sPos.z+radius;
	for (i = 0; i < 1 + 2 * radius; i++) {
		dropBlock(pos)
		world.setBlockAndMetadata(pos, 'Thaumcraft:blockWoodenDevice',6);
		pos.x++;
	}
}

function phase2() {
	planksAround(1,position);
	stairsAround(2,position);
	position.y++;
	stairsAround(1,position);
	dropBlock(position)
	world.setBlockAndMetadata(position,'ModpackStuff:mechanism',1)
	position.y=oPos.y;
}

function phase3() {
	planksAround(1,position);
	planksAround(2,position);
	stairsAround(3,position);
	position.y++;
	planksAround(1,position);
	stairsAround(2,position);
	position.y++;
	stairsAround(1,position);
	dropBlock(position)
	world.setBlockAndMetadata(position,'ModpackStuff:mechanism',1)
	position.y=oPos.y;
}

function phase4() {
	planksAround(1,position);
	planksAround(2,position);
	planksAround(3,position);
	stairsAround(4,position);
	position.y++;
	planksAround(1,position);
	planksAround(2,position);
	stairsAround(3,position);
	position.y++;
	planksAround(1,position);
	stairsAround(2,position);
	position.y++;
	stairsAround(1,position);
	dropBlock(position)
	world.setBlockAndMetadata(position,'ModpackStuff:mechanism',1)
	position.y=oPos.y;
}

function phase5() {
	planksAround(1,position);
	planksAround(2,position);
	planksAround(3,position);
	planksAround(4,position);
	stairsAround(5,position);
	position.y++;
	planksAround(1,position);
	planksAround(2,position);
	planksAround(3,position);
	stairsAround(4,position);
	position.y++;
	planksAround(1,position);
	planksAround(2,position);
	stairsAround(3,position);
	position.y++;
	planksAround(1,position);
	stairsAround(2,position);
	position.y++;
	stairsAround(1,position);
	dropBlock(position)
	position.y=oPos.y;
	for (i = 0; i < 5; i++) {
		world.setBlock(position,'Thaumcraft:blockLifter');
		position.y++;
	}
	for (i = 0; i < 10; i++) {
		if (world.getBlockName(position) == 'ModpackStuff:shroomBrownCap') {
			world.setBlock(position,'minecraft:air');
		}
		position.y++;
	}
}

if (count == 20) {
	world.playSound("tile.piston.out",oPos,5.0,1.0);
	phase2();
} else if (count == 50) {
	world.playSound("tile.piston.out",oPos,5.0,1.0);
	phase3();
} else if (count == 80) {
	world.playSound("tile.piston.out",oPos,5.0,1.0);
	phase4();
} else if (count == 110) {
	world.playSound("tile.piston.out",oPos,5.0,1.0);
	phase5();
}
count++;
// world.sendMessageToPlayer("Filloax",count);
world.setTileEntityIntData(oPos,"count",count);