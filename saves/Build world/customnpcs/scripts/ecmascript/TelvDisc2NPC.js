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
	var radius = 7;
	var hX = npc.getHomeX();
	var hY = npc.getHomeY();
	var hZ = npc.getHomeZ();
	var runs = 0;
	var getRandom = eval(npc.getStoredData("random"));
	while (runs < 500) {
		var eX = hX + getRandom(-radius,radius);
		var eY = hY - 1;
		var eZ = hZ + getRandom(-radius,radius);
		var endBlock = world.getBlock(eX,eY,eZ);
		var endBlockUp1 = world.getBlock(eX,eY+1,eZ);
		var endBlockUp2 = world.getBlock(eX,eY+2,eZ);
		if (endBlock != undefined && endBlockUp1 == undefined && endBlockUp2 == undefined) {
			npc.setPosition(eX,eY+1,eZ);
			break;
		}
	}
	npc.setTempData("count",0)
}

function update(event) {
	var hX = npc.getHomeX();
	var hY = npc.getHomeY();
	var hZ = npc.getHomeZ();
	var count = npc.getTempData("count");
	++count;
	if (count == 100) {
		count=0;
		npc.setPosition(hX,hY,hZ);
	}
	npc.setTempData("count",count);
}

function died(event) {
	var player = event.getSource();
	player.giveItem("ModpackStuff:activator",1,1)
}