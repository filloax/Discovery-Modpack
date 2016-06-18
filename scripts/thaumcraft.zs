import mods.thaumcraft.Research;
import mods.thaumcraft.Aspects;

var TTbook = <ModpackStuff:TCAddonsTomes:0>;

var woodWand = <Thaumcraft:WandCasting:0>;

recipes.remove(woodWand);

//Thaumic Tinkerer

Aspects.add(TTbook, "praecantatio 3");

Research.addResearch("MT_TTSTART_PARENT","TT_CATEGORY", "praecantatio 3", 0, 3, 1, TTbook);
Research.setVirtual("MT_TTSTART_PARENT",true);

Research.addResearch("MT_TTSTART","TT_CATEGORY", "praecantatio 3", 0, 2, 1, TTbook);
game.setLocalization("en_US", "tc.research_name.MT_TTSTART", "Tinkering knowledge");
game.setLocalization("en_US", "tc.research_text.MT_TTSTART", "[MT] When other kinds of tinkering aren't possible");

Research.setStub("MT_TTSTART", true);

Research.addPage("MT_TTSTART", "ttstart.research_page.MT_TTSTART");
game.setLocalization("en_US", "ttstart.research_page.MT_TTSTART", "This old tome seems to contain knowledge that could further your research on Thaumaturgy.");

Research.addPrereq("MT_TTSTART", "MT_TTSTART_PARENT", true);

Research.addPrereq("ICHOR", "MT_TTSTART", true);
Research.addPrereq("SPELL_CLOTH", "MT_TTSTART", false);
Research.addPrereq("GASEOUS_LIGHT", "MT_TTSTART", false);
Research.addPrereq("DARK_QUARTZ", "MT_TTSTART", false);
Research.setAutoUnlock("DARK_QUARTZ", false);



