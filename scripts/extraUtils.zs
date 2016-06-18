var redstone = <ore:dustRedstone>;
var enderPearl = <ore:pearlEnder>;
var pipe = <ExtraUtilities:pipes:*>;
var hGlass = <ore:blockGlassHardened>;
var chest = <ore:chestWood>;
var bucket = <minecraft:bucket>;
var lapis = <ore:gemLapis>;
var enderium = <ore:ingotEnderium>;
var obsidian = <ore:blockObsidian>;
var drill = <ImmersiveEngineering:drillhead:0>;
var compMat = <ExtraUtilities:decorativeBlock1:12>;
var enderPump = <ExtraUtilities:enderThermicPump>;
var sapling = <ore:treeSapling>;
var enderCore = <ore:blockEnderCore>;

var nodeItems = <ExtraUtilities:extractor_base:0>;
var nodeFluids = <ExtraUtilities:extractor_base:6>;
var enderObs = <ExtraUtilities:decorativeBlock1:1>;
var enderQuarry = <ExtraUtilities:enderQuarry>;

recipes.remove(nodeItems);
recipes.addShaped(nodeItems * 4,[[null,pipe,null],
							     [redstone,enderPearl,redstone],
								 [hGlass,chest,hGlass]]);
								 
recipes.remove(nodeFluids);
recipes.addShaped(nodeFluids * 4,[[null,pipe,null],
							     [lapis,enderPearl,lapis],
								 [hGlass,bucket,hGlass]]);
								 
recipes.remove(enderObs);
recipes.addShaped(enderObs * 4,[[null,obsidian,null],
								[obsidian,enderium,obsidian],
								[null,obsidian,null]]);
								
recipes.remove(enderQuarry);
recipes.addShaped(enderQuarry, [[enderObs,sapling,enderObs],
								[enderCore,compMat,enderCore],
								[enderPump,drill,enderPump]]);
