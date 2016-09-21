var ITEM_DMG = 5 ;

var itemCount = player.getItemCount('ModpackStuff:activator',ITEM_DMG);
var currentItem = player.getItemName(player.getCurrentSlot());
var currentMeta = player.getItemMetadata(player.getCurrentSlot());
var oPos = new Position(position.x,position.y,position.z);
var oName = world.getBlockName(oPos);
var oMeta = world.getBlockMetadata(oPos);

function checkBlocks(pos) {
	var name = world.getBlockName(pos);
	var meta = world.getBlockMetadata(pos);
	if (name == oName && meta == oMeta) {
		world.setBlock(pos,"minecraft:air");
		world.playSound("tile.piston.in",pos,1.0,1.0);
		pos.x--; pos.y--; pos.z--;
		for (i=0;i<3;i++) {
			for (j=0;j<3;j++) {
				for (k=0;k<3;k++) {
					checkBlocks(pos);
					pos.x++;
				}	
				pos.y++;
				pos.x-=3;
			}
			pos.z++;
			pos.y-=3;
		}
	}
}

if(itemCount > 0 && currentItem == "ModpackStuff:activator" && currentMeta == ITEM_DMG) {
	checkBlocks(oPos);
} else {
	player.sendMessage('It has a strange hole. Maybe it can be used to do something.');
}