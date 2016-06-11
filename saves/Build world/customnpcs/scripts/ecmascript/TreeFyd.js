function damaged() {
	if (npc.getHealth()-event.getDamage() > 0) {
		npc.executeCommand("/playsound witchery:mob.treefyd.treefyd_say @a[r=8] ~ ~ ~ 0.5 0.9");
	} else {
		npc.executeCommand("/playsound witchery:mob.treefyd.treefyd_say @a[r=8] ~ ~ ~ 0.5 0.7");
	}
}

function update() {
	//doing this because whìith a lot of treefyds loaded the sound got wonky for the player
	//as in, costant clickclickclick-ing wonky
	var count = npc.getTempData("count");
	var countMax = npc.getTempData("countMax");
	if (count >= countMax) {
		npc.executeCommand("/playsound witchery:mob.treefyd.treefyd_say @a[r=8] ~ ~ ~ 0.5 "+(1-0.1+Math.random()/5));
		countMax = 7 + Math.random()*6;
		count = 0;
	} else {
		count++;
	}
	npc.setTempData("count",count);
	npc.setTempData("countMax",countMax);
}