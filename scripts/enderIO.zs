var goldNugget = <ore:nuggetGold>;
var redstone = <ore:dustRedstone>;
var brokenFarm = <ModpackStuff:brokenMachine:0>;
var brokenStirling = <ModpackStuff:brokenMachine:1>;
var zLogic = <EnderIO:itemFrankenSkull:1>;
var stick = <ore:stickWood>;
var cobble = <ore:cobblestone>;
var condIron = <ore:ingotConductiveIron>;

var basicCapac = <EnderIO:itemBasicCapacitor>;
var stirling = <EnderIO:blockStirlingGenerator>;
var farm = <EnderIO:blockFarmStation>;
var basicGear = <EnderIO:itemMachinePart:1>;

recipes.remove(basicCapac);
recipes.addShaped(basicCapac,[[null,goldNugget,redstone],
							  [goldNugget,condIron,goldNugget],
							  [redstone,goldNugget,null]]);
					
recipes.addShapeless(farm, [brokenFarm,zLogic]);
recipes.addShapeless(stirling, [brokenStirling, condIron]);

recipes.remove(basicGear);
recipes.addShaped(basicGear * 2,[[stick,cobble,stick],
						      [cobble,condIron,cobble],
				              [stick,cobble,stick]]);
