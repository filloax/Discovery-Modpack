var hammer = <ImmersiveEngineering:tool:0>;
var steel = <ore:ingotSteel>;
var stick = <ore:stickWood>;
var belt = <ImmersiveEngineering:metalDevice:11>;
var leather = <ore:itemLeather>;
var red = <ore:dustRedstone>;
var copper = <ThermalFoundation:material:64>;
var iron = <minecraft:iron_ingot>;
var elec = <ImmersiveEngineering:metal:6>;
var blast = <ImmersiveEngineering:stoneDecoration:2>;
var mv = <ImmersiveEngineering:metalDevice:3>;
var cCoil = <ImmersiveEngineering:storage:8>;

var bBlast = <ModpackStuff:brokenMachine:3>;
var bLight = <ModpackStuff:brokenMachine:4>;
var bHeavy = <ModpackStuff:brokenMachine:5>;
var bGen = <ModpackStuff:brokenMachine:6>;
var bRad = <ModpackStuff:brokenMachine:7>;
var bLv = <ModpackStuff:brokenMachine:8>;
var bMv = <ModpackStuff:brokenMachine:9>;
var bSqueezer = <ModpackStuff:brokenMachine:10>;
var bFermenter = <ModpackStuff:brokenMachine:11>;

//gate IE
recipes.remove(hammer);
recipes.addShaped(hammer, [[null,steel,<minecraft:string>],
						   [null,stick,steel],
						   [stick,null,null]]);
						   
recipes.remove(belt);
recipes.addShaped(belt * 16, [[leather,leather,leather],
						 [iron,red,steel],
						 [null,null,null]]);
						 
recipes.addShapeless(mv,[elec,elec,bMv]);

recipes.addShapeless(blast,[bBlast]);
recipes.addShapeless(iron * 3,[bMv]);
recipes.addShapeless(iron,[bLv]);
recipes.addShapeless(copper, [bLight]);
recipes.addShapeless(iron * 3, [bHeavy]);
recipes.addShapeless(cCoil, [bGen]);
recipes.addShapeless(copper * 3, [bRad]);
recipes.addShapeless(iron * 2, [bSqueezer]);
recipes.addShapeless(iron * 2, [bFermenter]);
