const {
	createRiver,
	next_river,
	next_river_prev
} = require('./createRiver')
const { createRiverCrossing } = require('./createRiverCrossing')
const { getPossibleMoves } = require('./movePlayer')
const { player_initialise } = require('./player_info')
const {
	spawnPlayer,
	spawnPlayerTEST,
	posInit
} = require('./startPlayer')
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
const { plot_web_topology } = require('./visualise_web')

const isInBrowser = typeof window !== 'undefined'
const exportingObject = isInBrowser ? window : module.exports

function createMap () {
  var p1 = player_initialise(1000,"CVPI","Sumo");
  var p2 = player_initialise(2000,"MKT","Witch");
  var p3 = player_initialise(3000,"SSA","Knight");

  var pl_obj = [p1,p2,p3]

  // size of the window in which river gets created
  // even for even map size, uneven for uneven map size
  var window_river = Math.round(perc_river*size_map);
  if(size_map%2 == 0 && window_river%2 != 0){window_river -= 1;};
  if(size_map%2 != 0 && window_river%2 == 0){window_river -= 1;};

  createRiver(size_map,window_river);
  createRiverCrossing(size_map,dist_bridge);

  // starting position of the players
  var posPl = spawnPlayerTEST(pl_obj,size_map,window_river+2,player_border);

  posInit(pl_obj);

  // movement of players
  var char_obj = [];
  var i;
  var j;
  for(i= 0; i < 3; i++){
    for(j= 0; j < 5; j++){
      char_obj.push(pl_obj[i].charset[j])
    }
  }

  var tmp_char = char_obj[3];
  console.log(tmp_char.position)

  var mat_move = getPossibleMoves(tmp_char);
  console.log(tmp_char.position)

  tmp_char.position = {x: mat_move[3].x, y: mat_move[3].y};

  console.log(tmp_char.position)

  return char_obj
}

if (typeof window !== 'undefined') {
  window.createMap = createMap
  window.plot = function(char_obj){
    console.log('plotting map')
    plot_web_topology(map_topology,char_obj);
  }
}
if (typeof module !== 'undefined') {
  module.exports.createMap = createMap
}