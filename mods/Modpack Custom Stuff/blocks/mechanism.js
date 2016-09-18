name = "mechanism";
material = "rock";
creativeTab = "buildingBlocks";
transparent = true;

var texture = ["/thaumcraft:lifterside.png","/thaumcraft:lifterside.png","/thaumcraft:lifterside.png","/stonebrick.png","/stonebrick.png","/stonebrick.png","/mob_spawner.png","/geostrata:sandstone_b.png","/geostrata:sandstone_b.png","/hardened_clay_stained_yellow.png","mechaclay.png","","","","",""];
for (i=0;i<11;i++) {
	textureFileXP[i] = texture[i];
	textureFileXN[i] = texture[i];
	textureFileYP[i] = texture[i];
	textureFileYN[i] = texture[i];
	textureFileZP[i] = texture[i];
	textureFileZN[i] = texture[i];
	addToCreative[i] = true;
	hardness[i] = -1.0;
	resistance[i] = 18000000.0;
}

textureFileYP[0] = "/thaumcraft:liftertop.png";
textureFileYN[0] = "/thaumcraft:arcaneearbottom.png";
onActivated[0] = "mod.loadScript('elevatorScript.js');";

addToCreative[1] = false;
textureFileYP[1] = "/thaumcraft:liftertop.png";
textureFileYN[1] = "/thaumcraft:arcaneearbottom.png";

addToCreative[2] = false;
textureFileYP[2] = "/thaumcraft:liftertop.png";
textureFileYN[2] = "/thaumcraft:arcaneearbottom.png";
tileEntity[2] = "elevTE";
hasTileEntity[2] = true;

hardness[3] = 1.5;
resistance[3] = 30;
toolClass[3] = "pickaxe";
textureFileYP[3] = "icerune.png";
// onCollidedWithPlayer[3] = "mod.loadScript('icerune.js');"
onWalkingPlayer[3] = "mod.loadScript('icerune.js');"
drop[3] = "minecraft:stonebrick";

hardness[4] = 1.5;
resistance[4] = 30;
toolClass[4] = "pickaxe";
textureFileYP[4] = "firerune.png";
// onCollidedWithPlayer[4] = "mod.loadScript('firerune.js');"
onWalkingPlayer[4] = "mod.loadScript('firerune.js');"
drop[4] = "minecraft:stonebrick";

hardness[5] = 1.5;
resistance[5] = 30;
toolClass[5] = "pickaxe";
textureFileYP[5] = "shockrune.png";
// onCollidedWithPlayer[5] = "mod.loadScript('shockrune.js');"
onWalkingPlayer[5] = "mod.loadScript('shockrune.js');"
addToCreative[5] = true;
drop[5] = "minecraft:stonebrick";

hardness[6] = 5.0;
tileEntity[6] = "spawner";
hasTileEntity[6] = true;
drop[6] = "minecraft:air";
tileTransparent[6] = true;

textureFileYP[7] = "shrinker.png";
onWalkingPlayer[7] = "mod.loadScript('shrinker.js');"

textureFileYP[8] = "enlarger.png";
onWalkingPlayer[8] = "mod.loadScript('enlarger.js');"

textureFileYP[9] = "hotclay.png";
onWalkingPlayer[9] = "mod.loadScript('hotclay.js');"

onActivated[10] = "mod.loadScript('mechaclay.js');"

