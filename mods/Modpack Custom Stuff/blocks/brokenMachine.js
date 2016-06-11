name = "brokenMachine";
material = "iron";
stepSound = "metal";
creativeTab = "materials";

//0 EIO farm, 1 EIO stirling, 2 rolling, 3 reinf blast brick
//4 light engi, 5 heavy engi, 6 IE gen, 7 IE radiator
//8 LV capac, 9 MV capac , 10 squeezer, 11 fermenter

var texture = ["machineSide.png","machineSide.png","rollingSide.png","blastBrickReinforced.png","metalDeco_electricMachine.png","metalDeco_engine.png","metalDeco_generator.png","metalDeco_radiator.png","metal_capacitorLV_side_none.png","metal_capacitorMV_side_none.png","metal_squeezer.png","metal_fermenter.png"]

for (i=0;i<12;i++) {
	addToCreative[i] = true;
	hardness[i] = 5.0;
	toolClass[i] = "pickaxe";
	harvestLevel[i] = 2;
	textureFileXP[i] = texture[i];
	textureFileXN[i] = texture[i];
	textureFileYP[i] = texture[i];
	textureFileYN[i] = texture[i];
	textureFileZP[i] = texture[i];
	textureFileZN[i] = texture[i];
}

textureFileYP[0] = "machineTop.png";
textureFileYN[0] = "machineBottom.png";

textureFileXP[1] = "stirlingGenFrontOff.png";
textureFileYP[1] = "machineTop.png";
textureFileYN[1] = "machineBottom.png";

textureFileYP[2] = "rollingTop.png";
textureFileYN[2] = "rollingBottom.png";

textureFileYP[8] = "metal_capacitorLV_top_none.png";
textureFileYN[8] = "metal_capacitorLV_bottom_none.png";

textureFileYP[9] = "metal_capacitorMV_top_none.png";
textureFileYN[9] = "metal_capacitorMV_bottom_none.png";