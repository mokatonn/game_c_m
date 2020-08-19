// everything that concerns the initialisation of players and characters

function player_initialise(id,name,char){

  var charset_special = {};
  charset_special.type = char;
  charset_special.gems = 0; // number of gems
  charset_special.inventory = []; // any other items
  charset_special.id = 100*id;

  var char_tmp = [];
  var i;
  for(i = 0; i < 4; i++){
    var charset_default = {};
    charset_default.type = "Villager";
    charset_default.gems = 0; // number of gems
    charset_default.inventory = []; // any other items
    charset_default.id = 100*id + 1 + i;
    char_tmp[i] = charset_default;
  }
  char_tmp[i] = charset_special;

  var player = {};
  player.id = id;
  player.name = name;
  player.spawn = [];
  player.charset = char_tmp;

  return player;

}
