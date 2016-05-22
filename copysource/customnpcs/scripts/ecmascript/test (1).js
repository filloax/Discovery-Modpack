var clicked = 0;
function interact(event){
  clicked++;
  event.npc.say(clicked);
}
 
function died(event){
  clicked = 0;
}