//if player has no mysterypiece, give him one
//search 3x5x3 area centered on block for mysteryman_1
//when found, replace all mysteryman blocks with their +6 equivalent and add mysteryman_13 and _14 on top of that
//-z --> +z-
//# #     1314
//5 6     1112
//3 4     9 10
//1 2 --> 7 8

// if (player.getItemCount("ModpackStuff:activator",4) == 0) {
	
var pos = new Position(position.x,position.y,position.z);
var spos; //Position of mysteryman_1
pos.x--;
pos.y-=2;
pos.z--;
for (i=0;i<3;i++) {
	for (j=0;j<5;j++) {
		for (k=0;k<3;k++) {
			if (world.getBlockName(pos) == "ModpackStuff:mysteryman_1") {
				spos = new Position(pos.x,pos.y,pos.z);
				// break;
			}
			pos.x++;
		}
		pos.x-=3;
		pos.y++;
	}
	pos.y-=5;
	pos.z++;
}

if (spos != undefined) {
	player.add("ModpackStuff:activator",1,4);
	world.playSound("null",position,1.0,1.0);
	
	pos.x = spos.x;
	pos.y = spos.y;
	pos.z = spos.z;
	world.setBlockAndMetadata(pos,"ModpackStuff:mysteryman_7",4);
	// player.sendMessage("Set block 7 at pos "+pos.x+" "+pos.y+" "+pos.z);
	pos.z++
	world.setBlockAndMetadata(pos,"ModpackStuff:mysteryman_8",4);
	// player.sendMessage("Set block 8 at pos "+pos.x+" "+pos.y+" "+pos.z);
	pos.y++;
	world.setBlockAndMetadata(pos,"ModpackStuff:mysteryman_10",4);
	// player.sendMessage("Set block 10 at pos "+pos.x+" "+pos.y+" "+pos.z);
	pos.z--;
	world.setBlockAndMetadata(pos,"ModpackStuff:mysteryman_9",4);
	// player.sendMessage("Set block 9 at pos "+pos.x+" "+pos.y+" "+pos.z);
	pos.y++;
	world.setBlockAndMetadata(pos,"ModpackStuff:mysteryman_11",4);
	// player.sendMessage("Set block 11 at pos "+pos.x+" "+pos.y+" "+pos.z);
	pos.z++;
	world.setBlockAndMetadata(pos,"ModpackStuff:mysteryman_12",4);
	// player.sendMessage("Set block 12 at pos "+pos.x+" "+pos.y+" "+pos.z);
	pos.y++;
	world.setBlockAndMetadata(pos,"ModpackStuff:mysteryman_14",4);
	// player.sendMessage("Set block 14 at pos "+pos.x+" "+pos.y+" "+pos.z);
	pos.z--;
	world.setBlockAndMetadata(pos,"ModpackStuff:mysteryman_13",4);
	// player.sendMessage("Set block 13 at pos "+pos.x+" "+pos.y+" "+pos.z);
}

// }