//Update
// var msgs = ["Let Thimryn","Let Talna","Let Riviuth","Let Roma","Let Ryf","Let Nrabora","Let Naruh","Let Sov"];
// var msgs = ["111","666","15","13","2147483647","007","1","64"];
// var msgs = ["a bewitched tomb","an abandoned tomb","an old tomb","an accursed tomb","a creepy tomb","a spooky tomb","a scary tomb","a spoopy tomb"];
// var msgs = ["Immersion Industries","Themal Enlargement Industries","X & Y Co.","Sylph Co.","E. I & O Co.","Industrious Crafts","Mines & Crafts Co.","Tinkering & Constructs Co."];
var msgs = ["Glass","Mass","SaaS","*ss","TAS","Vetro","ガラス","Gas"];

var msgstart = "You have discovered the Garden of ";
var msgend = "!";

var players = npc.getSurroundingEntities(15,1);

if (players != null && players.length >= 1) {
	var helditemstack = players[0].getHeldItem();
	var helditem;
	if (helditemstack != null) {
		helditem = helditemstack.getName();
	}
	
	if (helditem != "customnpcs:npcScripter" && helditem != "customnpcs:npcMobCloner" && helditem != "customnpcs:npcWand") {
		npc.executeCommand("/playsoundb discovery normal @a[r=50]");
		npc.executeCommand('/tellraw @a[r=1000] {color:"dark_blue",bold:1,text:"'+msgstart+msgs[Math.floor(Math.random()*msgs.length)]+msgend+'"}');
		npc.despawn();
	}
}