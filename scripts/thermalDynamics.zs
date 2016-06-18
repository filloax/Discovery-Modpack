var leadDuct = <ThermalDynamics:ThermalDynamics_0:0>;
var redEnDuct = <ThermalDynamics:ThermalDynamics_0:2>;
var resDuct = <ThermalDynamics:ThermalDynamics_0:4>;
var cryoDuct = <ThermalDynamics:ThermalDynamics_0:6>;

var tempDuct = <ThermalDynamics:ThermalDynamics_16:0>;
var tempDuctOp = <ThermalDynamics:ThermalDynamics_16:1>;

var itemDuct = <ThermalDynamics:ThermalDynamics_32:0>;
var itemDuctOp = <ThermalDynamics:ThermalDynamics_32:1>;
var impulseDuct = <ThermalDynamics:ThermalDynamics_32:2>;

var redEnDuctEmpty = <ThermalDynamics:ThermalDynamics_0:3>;
var resDuctEmpty = <ThermalDynamics:ThermalDynamics_0:5>;
var cryoDuctEmpty = <ThermalDynamics:ThermalDynamics_0:7>;

var lead = <ore:ingotLead>;
var red = <ore:dustRedstone>;
var hGlass = <ore:blockGlassHardened>;
var redBlock = <ore:blockRedstone>;
var cryo = <ore:dustCryotheum>;
var copper = <ore:ingotCopper>;
var invar = <ore:ingotInvar>;
var glowstone = <ore:glowstone>;

//gate pipes craftable without machines
recipes.remove(leadDuct);
recipes.addShaped(leadDuct,[[red,red,red],
							[lead,hGlass,lead],
							[red,red,red]]);
							
recipes.remove(tempDuct);
recipes.addShaped(tempDuct,[[copper,hGlass,copper]]);
recipes.remove(tempDuctOp);
recipes.addShaped(tempDuctOp,[[copper,invar,copper]]);
							
recipes.removeShaped(itemDuctOp);												
							
//fix uncraftable pipes
recipes.addShapeless(redEnDuct * 5,[redBlock,redEnDuctEmpty,redEnDuctEmpty,redEnDuctEmpty,redEnDuctEmpty,redEnDuctEmpty]);
recipes.addShapeless(resDuct * 5,[redBlock,resDuctEmpty,resDuctEmpty,resDuctEmpty,resDuctEmpty,resDuctEmpty]);
recipes.addShapeless(cryoDuct * 2, [cryoDuctEmpty,cryoDuctEmpty,cryo]);
recipes.addShapeless(impulseDuct * 5, [glowstone,itemDuct,itemDuct,itemDuct,itemDuct,itemDuct]);
