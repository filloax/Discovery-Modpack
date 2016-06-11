var name = world.getBlockName(position);
if (name == "witchery:witchesovenidle") {
	player.remove(itemstack.getItemName(),1,itemstack.getDamage());
	player.add(itemstack.getItemName(),1,3);
}