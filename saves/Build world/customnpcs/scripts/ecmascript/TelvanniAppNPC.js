function init(event){
	var iX = npc.getX();
	var iY = npc.getY();
	var iZ = npc.getZ();
	var getRandomIntInclusive = "function(min, max) {\
		return Math.floor(Math.random() * (max - min + 1)) + min;\
	}"
	npc.setHome(iX,iY,iZ);
	npc.setStoredData("random",getRandomIntInclusive);
}

function damaged(event){
	var hRadius = 10;
	var radius = 5;
	var hX = npc.getHomeX();
	var hY = npc.getHomeY();
	var hZ = npc.getHomeZ();
	var sX = npc.getX();
	var sY = npc.getY();
	var sZ = npc.getZ();
	var runs = 0;
	var getRandom = eval(npc.getStoredData("random"));
	if (sX <= hX + hRadius && sX >= hX - hRadius && sY <= hY + hRadius && sY >= hY - hRadius && sZ <= hZ + hRadius && sZ >= hZ - hRadius) { 
		while (runs < 500) {
			var eX = sX + getRandom(-radius,radius);
			var eY = sY - 1;
			var eZ = sZ + getRandom(-radius,radius);
			var endBlock = world.getBlock(eX,eY,eZ);
			var endBlockUp1 = world.getBlock(eX,eY+1,eZ);
			var endBlockUp2 = world.getBlock(eX,eY+2,eZ);
			if (endBlock != undefined && endBlockUp1 == undefined && endBlockUp2 == undefined) {
				npc.setPosition(eX,eY+1,eZ);
				break;
			}
		}
	}
}