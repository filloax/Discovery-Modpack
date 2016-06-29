var paste = <witchery:ingredient:153>;
var oven = <witchery:witchesovenidle>;

var bSeeds = <witchery:seedsbelladonna>;
var aSeeds = <witchery:seedsartichoke>;
var mSeeds = <witchery:seedsmandrake>;
var sSeeds = <witchery:seedssnowbell>;
var rebirth = <witchery:ingredient:33>;
var iron = <ore:ingotIron>;
var bars = <minecraft:iron_bars>;
var purity = <witchery:ingredient:36>;

recipes.remove(paste);
recipes.addShapeless(paste, [bSeeds,aSeeds,mSeeds,sSeeds,rebirth]);

recipes.remove(oven);
recipes.addShaped(oven, [[null,bars,null],
						 [iron,iron,iron],
						 [iron,purity,iron]]);
