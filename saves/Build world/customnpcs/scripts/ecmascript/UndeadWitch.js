function init() {
	var rand = Math.random();
	var texture = (rand != 0) ? Math.ceil(rand * 5) : 1;
	
	npc.setTexture("customnpcs:textures/covenwitch"+texture+".png");
	npc.setTempData("countMax",1);
	npc.setTempData("count",0);
	switch(Math.round(Math.random() * 2)) {
		case 1:
			npc.setStoredData("type","spell");
			break;
		default:
			npc.setStoredData("type","brew");
	}
}

function update() {
	var type = npc.getStoredData("type");
	if (npc.isAttacking()) {
		var count = npc.getTempData("count");
		var countMax = npc.getTempData("countMax");
		
		var playerL = npc.getSurroundingEntities(60,1);
		var player;
		try {
			player = playerL[0];
		}
		catch(err) {
			player = "this is weird, getSurroudingEntities works strangely so I have to do this workaround";
		}
		
		if (typeof player != "string") {
			var mcNpc = npc.getMCEntity();
			var mcPlayer = player.getMCEntity();
			var dist = mcNpc.func_70032_d(mcPlayer); //get distance from player
		
			//Switch between Retaliate and not to space player
			if (dist > 4) {
				npc.setRetaliateType(0);
			} else {
				npc.setRetaliateType(3);
			}
			
			//Throw potion or shoot spell
			if (count >= countMax) {
				var x = npc.getX();
				var z = npc.getZ();
				var px = player.getX();
				var pz = player.getZ();
				var brew;	
				
				//Calculate throw force and direction
				var dirx = (px-x)/30*1.6;
				var dirz = (pz-z)/30*1.6;
				
				//Verse of the two components
				var verx = (dirx >= 0) ? 1 : -1;
				var verz = (dirz >= 0) ? 1 : -1;
				
				var l = 2.0; //Max throw force
				
				//the idea is to limit the throw force's vector module to 2, while keeping the original direction
				//following the equations b=ak and c^2 = a^2 + b^2, where b is z, a is x, c is the throw force
				if (Math.sqrt(dirx^2+diry^2) > l) {
					var k = dirz/dirx;
					
					var modx = l / Math.sqrt(k^2 + 1);
					var modz = l / Math.sqrt((1 / k^2) + 1);
					
					dirx = modx * verx;
					dirz = modz * verz;
				}
				

				var offx = (px-x > 0) ? Math.ceil((px-x)/100)*2 : Math.floor((px-x)/100)*2;
				var offz = (pz-z > 0) ? Math.ceil((pz-z)/100)*2 : Math.floor((pz-z)/100)*2;

				//Throw potion
				if (type == "brew") {
					//Choose which one to throw
					switch(Math.floor(Math.random() * 10)) {
						case 1:
							//Webs
							brew = 58;
							break;
						case 2:
							//Bats
							brew = 109;
							break;
						// case 3:
							//Infection
							// brew = 88;
							// break;
						case 4:
							//Ink
							brew = 60;
							break;
						case 5:
							//Frost
							brew = 76;
							break;
						default:
							brew = "Harming"
					}
					
					var diry = 0.2
					
					npc.executeCommand("/playsound random.bow @a ~ ~ ~ 1.0 0.7")
					if (typeof brew != "string") {
						npc.executeCommand("summon witchery.brew ~"+offx+" ~1 ~"+offz+" {Motion:["+dirx+","+diry+","+dirz+"],Air:300,damageValue:"+brew+",inTile:-1,xTile:-1,yTile:-1,zTile:-1}");
					} else {
						npc.executeCommand("/summon2 witchery.brew2 ~"+offx+" ~1 ~"+offz+" {Motion:["+dirx+","+diry+","+dirz+"],Air:300,inTile:-1,xTile:-1,yTile:-1,zTile:-1,Spell:0,Brew:{id:witchery:brewbottle,tag:{Splash:1,Color:11886640,EffectCount:1,Items:[{id:372},{id:376},{id:382},{id:289}]}}}")
					}
				} else {
				//Shoot spell
					switch(Math.floor(Math.random() * 10)) {
							case 1:
								//Poison
								brew = "{id:witchery:brewbottle,tag:{Splash:1,Color:24135678,EffectCount:1,Items:[{id:372},{id:375},{id:289}]}}";
								break;
							case 2:
								//Slow
								brew = "{id:witchery:brewbottle,tag:{Splash:1,Color:11883427,EffectCount:1,Items:[{id:372},{id:376},{id:353},{id:289}]}}";
								break;
							case 3:
								//Weakness
								brew = "{id:witchery:brewbottle,tag:{Splash:1,Color:15436896,EffectCount:1,Items:[{id:372},{id:376},{id:377},{id:289}]}}";
								break;
							case 4:
								//Grue
								brew = "{id:witchery:brewbottle,tag:{Splash:1,Color:11881980,EffectCount:1,Items:[{id:372},{id:witchery:ingredient,Damage:37},{id:88},{id:289}]}}";
								break;
							default:
								//Damage
								brew = "{id:witchery:brewbottle,tag:{Splash:1,Color:11886640,EffectCount:1,Items:[{id:372},{id:376},{id:382},{id:289}]}}"
					}
					
					var diry = -0.1

					npc.executeCommand("/playsound mob.ghast.fireball @a")
					npc.executeCommand("/summon2 witchery.brew2 ~"+offx+" ~1 ~"+offz+" {Motion:["+dirx+","+diry+","+dirz+"],Air:300,inTile:-1,xTile:-1,yTile:-1,zTile:-1,Spell:1,Brew:"+brew+"}")
				}
				
				var count = 0;
				
				//Set the next time to wait until potion throw
				var newCountMax = 2 + Math.random() * 6;
				npc.setTempData("countMax",newCountMax);
			} else {
				++count;
			}
			npc.setTempData("count",count);
		}
	}
}