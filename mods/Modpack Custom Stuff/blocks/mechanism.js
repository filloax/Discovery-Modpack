name = "mechanism";
material = "rock";
creativeTab = "buildingBlocks";
transparent = true;

var texture = ["/thaumcraft:lifterside.png","/thaumcraft:lifterside.png","/thaumcraft:lifterside.png","/stonebrick.png","/stonebrick.png","/stonebrick.png","/mob_spawner.png","/geostrata:sandstone_b.png","/geostrata:sandstone_b.png","","","","","","",""];
for (i=0;i<16;i++) {
	textureFileXP[i] = texture[i];
	textureFileXN[i] = texture[i];
	textureFileYP[i] = texture[i];
	textureFileYN[i] = texture[i];
	textureFileZP[i] = texture[i];
	textureFileZN[i] = texture[i];
}

addToCreative[0] = true;
hardness[0] = -1.0;
resistance[0] = 18000000.0;
textureFileYP[0] = "/thaumcraft:liftertop.png";
textureFileYN[0] = "/thaumcraft:arcaneearbottom.png";
onActivated[0] = "mod.loadScript('elevatorScript.js');";

addToCreative[1] = false;
hardness[1] = -1.0;
resistance[1] = 18000000.0;
textureFileYP[1] = "/thaumcraft:liftertop.png";
textureFileYN[1] = "/thaumcraft:arcaneearbottom.png";

addToCreative[2] = false;
hardness[2] = -1.0;
resistance[2] = 18000000.0;
textureFileYP[2] = "/thaumcraft:liftertop.png";
textureFileYN[2] = "/thaumcraft:arcaneearbottom.png";
tileEntity[2] = "elevTE";
hasTileEntity[2] = true;

hardness[3] = 1.5;
toolClass[3] = "pickaxe";
textureFileYP[3] = "icerune.png";
// onCollidedWithPlayer[3] = "mod.loadScript('icerune.js');"
onWalkingPlayer[3] = "mod.loadScript('icerune.js');"
addToCreative[3] = true;
drop[3] = "minecraft:stonebrick";

hardness[4] = 1.5;
toolClass[4] = "pickaxe";
textureFileYP[4] = "firerune.png";
// onCollidedWithPlayer[4] = "mod.loadScript('firerune.js');"
onWalkingPlayer[4] = "mod.loadScript('firerune.js');"
addToCreative[4] = true;
drop[4] = "minecraft:stonebrick";

hardness[5] = 1.5;
toolClass[5] = "pickaxe";
textureFileYP[5] = "shockrune.png";
// onCollidedWithPlayer[5] = "mod.loadScript('shockrune.js');"
onWalkingPlayer[5] = "mod.loadScript('shockrune.js');"
addToCreative[5] = true;
drop[5] = "minecraft:stonebrick";

addToCreative[6] = true;
hardness[6] = 5.0;
resistance[6] = 18000000.0;
tileEntity[6] = "spawner";
hasTileEntity[6] = true;
drop[6] = "minecraft:air";
tileTransparent[6] = true;

addToCreative[7] = true;
hardness[7] = -1.0;
resistance[7] = 18000000.0;
textureFileYP[7] = "shrinker.png";
onWalkingPlayer[7] = "mod.loadScript('shrinker.js');"

addToCreative[8] = true;
hardness[8] = -1.0;
resistance[8] = 18000000.0;
textureFileYP[8] = "enlarger.png";
onWalkingPlayer[8] = "mod.loadScript('enlarger.js');"

// addToCreative[6] = true;
// hardness[6] = -1.0;
// resistance[6] = 18000000.0;