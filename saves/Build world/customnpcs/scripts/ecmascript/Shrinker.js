//Shrinker
function collide(event){
	var playerL = npc.getSurroundingEntities(2,1);
	var player;
	try {
		player = playerL[0];
	}
	catch(err) {
		player = "this is weird, getSurroudingEntities works strangely so I have to do this workaround";
	}
	
	if (typeof player != "string") {
		var shrink = 59; //From the witchery.cfg file
		
		player.addPotionEffect(shrink, 200, 0, true);
	}
}

//Enlarger
function collide(event){
	var playerL = npc.getSurroundingEntities(2,1);
	var player;
	try {
		player = playerL[0];
	}
	catch(err) {
		player = "this is weird, getSurroudingEntities works strangely so I have to do this workaround";
	}
	
	if (typeof player != "string") {
		var shrink = 59; //From the witchery.cfg file
		
		player.addPotionEffect(shrink, 0, 0, true);
	}
}

function damaged(event) {
	event.setCancelled(true);
}