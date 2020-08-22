const {
  getRandomInt,
  size_map,
  perc_river,
  dist_bridge,
  index_river,
  index_bridge,
  player_start,
  number_players,
  player_border,
  map_topology,
  river_coord,
  map_movement,
  map_player
} = require('./var_global_init')


// everything that concerns the initialisation of players and characters

module.exports.player_initialise = function player_initialise(id,name,char){

  var charset_special = {};
  charset_special.type = char;
  charset_special.gems = 0; // number of gems
  charset_special.inventory = []; // any other items
  charset_special.id = 100*id;
  charset_special.player = name;
  charset_special.playerId = id;
  charset_special.position = {};

  var char_tmp = [];
  char_tmp[0] = charset_special;
  var i;
  for(i = 0; i < 4; i++){
    var charset_default = {};
    charset_default.type = "Villager";
    charset_default.gems = 0; // number of gems
    charset_default.inventory = []; // any other items
    charset_default.id = 100*id + 1 + i;
    charset_default.position = {};
    charset_default.playerId = id;
    charset_default.player = name;
    char_tmp[i+1] = charset_default;
  }


  var player = {};
  player.id = id;
  player.name = name;
  player.spawn = {};
  player.charset = char_tmp;

  return player;

}
