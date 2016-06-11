name = "mazeBlock";
material = "rock";
creativeTab = "buildingBlocks";
transparent = true;

var texture = ["/geostrata:sandstone_b.png","sandstone_moss","sandstone_crack","","","","","","","","","","","","",""];
for (i=0;i<16;i++) {
	textureFileXP[i] = texture[i];
	textureFileXN[i] = texture[i];
	textureFileYP[i] = texture[i];
	textureFileYN[i] = texture[i];
	textureFileZP[i] = texture[i];
	textureFileZN[i] = texture[i];
	drop[i] = "minecraft:air";
	onDestroyedByPlayer[i] = "if (player.getInventory().getItemName(player.getCurrentSlot()) != 'TwilightForest:item.mazebreakerPick' && !player.isInCreative()) {\
		world.setBlockAndMetadata(position,'ModpackStuff:mazeBlock',"+i+")\
	}"
}

addToCreative[0] = true;
hardness[0] = 1.35;
resistance[0] = 12.0;

addToCreative[1] = true;
hardness[1] = 1.35;
resistance[1] = 12.0;

addToCreative[2] = true;
hardness[2] = 1.35;
resistance[2] = 12.0;
