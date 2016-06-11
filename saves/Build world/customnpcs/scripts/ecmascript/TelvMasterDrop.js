function init(event) {
	var book = world.createItem("ModpackStuff:TCAddonsTomes",0,1);
	var wand = world.createItem("Thaumcraft:WandCasting",0,1);
	wand.setTag("ordo",2500)
	wand.setTag("perditio",2500)
	wand.setTag("ignis",2500)
	wand.setTag("aqua",2500)
	wand.setTag("aer",2500)
	wand.setTag("terra",2500)
	var lootBag = world.createItem("Thaumcraft:ItemLootBag",2,2);
	
	npc.dropItem(book);
	npc.dropItem(wand);
	npc.dropItem(lootBag);
	
	npc.despawn();
}