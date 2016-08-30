/* get a random type from 3:
1:small,weak
2:average, default
3:big,strong */
var factory = npc.getStoredData("factory"); //this is turned true if it's spawned by the golem factory

if (!factory || factory == null) {
	var rand = Math.random()*3;
	var INT_MAX = 2147483647;
	
	if (rand < 1) {
		npc.setSize(2);
		npc.setMeleeStrength(6);
		// npc.addPotionEffect(1,INT_MAX,0,true); //speed doesn't hide particles, disabled
	} else if (rand > 2 && rand < 3){
		npc.setSize(4);
		npc.setMeleeStrength(10);
		// npc.addPotionEffect(2,INT_MAX,0,true); //slow doesn't hide particles, disabled
	}
}