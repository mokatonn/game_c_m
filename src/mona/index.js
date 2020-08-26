const {
	createRiver,
	next_river,
	next_river_prev
} = require('./createRiver')
const { createRiverCrossing } = require('./createRiverCrossing')
const {
	getPossibleMoves,
	resolvePlayerFight
} = require('./movePlayer')
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
	/*watchify ./src/mona/index.js -o ./browser/index.js */
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
	var tmp_char2 = char_obj[7];
	var test_pos = {x: 2, y: 4};
	map_player[test_pos.x][test_pos.y] = tmp_char2;
	map_player[tmp_char2.position.x][tmp_char2.position.y] = 0;

  tmp_char2.position = test_pos;

  var mat_move = getPossibleMoves(tmp_char);

  plot_web_topology(map_topology,char_obj,mat_move);

	// var move_select = 3;
	var move_select = 2;
	if(mat_move[move_select].type == "attack"){
		var tmpDefend = map_player[mat_move[move_select].x ][ mat_move[move_select].y];
		var tmp = resolvePlayerFight (tmp_char, tmpDefend);
		map_player[mat_move[move_select].x ][ mat_move[move_select].y] = tmp.winner;
		char_obj.splice(char_obj.indexOf(char_obj.find(obj => {return obj.id === tmp.loser.id})),1)

		tmp.winner.position = {x: mat_move[move_select].x, y: mat_move[move_select].y};

	}else{
		tmp_char.position = {x: mat_move[move_select].x, y: mat_move[move_select].y};
	}

  plot_web_topology(map_topology,char_obj);
  //console.log(tmp_char.position)

  return char_obj
}

if (typeof window !== 'undefined') {
  window.createMap = createMap
  window.plot = function(char_obj){
    //console.log('plotting map')
    //plot_web_topology(map_topology,char_obj);
  }
}
if (typeof module !== 'undefined') {
  module.exports.createMap = createMap
}
