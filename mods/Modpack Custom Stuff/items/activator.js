name = "activator";
creativeTab = "misc";
maxStack = 64;

addToCreative[0] = true;
textureFile[0] = "levAct.png";
addToCreative[1] = true;
textureFile[1] = "/Thaumcraft:shard_balanced.png";
addToCreative[2] = true;
textureFile[2] = "oldPoppet.png";
onUse[2] = "mod.loadScript('oldpoppet.js');";
addToCreative[3] = true;
textureFile[3] = textureFile[2];