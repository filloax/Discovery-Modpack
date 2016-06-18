import mods.railcraft.Rolling;

var rolling = <Railcraft:machine.alpha:8>;
var rollingB = <ModpackStuff:brokenMachine:2>;
var iron = <minecraft:iron_ingot>;
var piston = <minecraft:piston>;

recipes.remove(rolling);

Rolling.addShaped(rolling,[[iron,piston,iron],
						   [piston,<minecraft:crafting_table>,piston],
						   [iron,piston,iron]]);

Rolling.addShapeless(rolling,[rollingB]);

recipes.addShapeless(iron * 4,[rollingB]);
