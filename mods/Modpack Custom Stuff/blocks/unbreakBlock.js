name = "unbreakBlock";
material = "rock";
creativeTab = "buildingBlocks";
transparent = true;

var texture = ["/geostrata:sandstone_b.png","","","","","","","","","","","","","","",""];
for (i=0;i<16;i++) {
	textureFileXP[i] = texture[i];
	textureFileXN[i] = texture[i];
	textureFileYP[i] = texture[i];
	textureFileYN[i] = texture[i];
	textureFileZP[i] = texture[i];
	textureFileZN[i] = texture[i];
	hardness[i] = -1.0;
	resistance[i] = 18000000.0;
}

addToCreative[0] = true;