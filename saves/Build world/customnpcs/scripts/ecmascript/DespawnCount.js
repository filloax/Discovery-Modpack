var count = npc.getStoredData("count");
var MAX = 7;

if (count >= MAX) {
	npc.despawn();
} else if (count < MAX) {
	count++;
}

npc.setStoredData("count",count);

//Init
npc.setStoredData("count",0);