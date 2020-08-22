
// size of the map
const size_map = module.exports.size_map = 20;

// percentage of the window in which the river is placed
module.exports.perc_river = 0.3;

// average distance between bridges
module.exports.dist_bridge = 4;

// different indices for different structures
module.exports.index_river = 1;
module.exports.index_bridge = 2;
module.exports.player_start = 3;

// player start
module.exports.number_players = 2;

// minimum distance of players to border
module.exports.player_border = 2;

module.exports.getRandomInt = function getRandomInt(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports.map_topology = Array(size_map).fill(0).map(()=>Array(size_map).fill(0));
module.exports.river_coord = Array(size_map).fill(0).map(()=>Array(2).fill(0));

module.exports.map_movement = Array(size_map).fill(1).map(()=>Array(size_map).fill(1));

module.exports.map_player = Array(size_map).fill(0).map(()=>Array(size_map).fill(0));
