(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

module.exports.createRiver = function createRiver(s,win_river) {
// rivers are marked in map_topology with idx_river
// players cannot walk on river (map_movement changed to 0)
// s = size_map; p_r = perc_river;

  var river_x = 0;
  var x = (s - win_river)/2;
  var y = x + win_river-1;
  var river_y = getRandomInt(x, y);

  river_coord[0] = [river_x,river_y];
  map_topology[river_x][river_y] = index_river;
  map_movement[river_x][river_y] = 0;

  var i;
  for (i = 0; i < (size_map-1); i++) {
    [river_x,river_y] = next_river(river_x,river_y,x,y)
    river_coord[i+1] = [river_x,river_y];
    map_topology[river_x][river_y] = index_river;
    map_movement[river_x][river_y] = 0;
  }

  // removed for now due to formatting issues of river_coord
  /*rn1 = Math.floor((Math.random() * 3) + 1);
  if(rn1 == 1){
    map_topology = rotateCounterClockwise(map_topology);
    map_movement = rotateCounterClockwise(map_movement);
    river_coord = rotateCounterClockwise(river_coord);
  }else if(rn1 == 2){
    map_topology = rotateClockwise(map_topology);
    map_movement = rotateClockwise(map_movement);
    river_coord = rotateClockwise(river_coord);
  }*/

}

const next_river = module.exports.next_river = function next_river(river_x,river_y,b1,b2){
  river_x = river_x + 1;

  rn2 = Math.random();

  if (rn2 < 0.33) {
    river_y += 1;
  }else if (rn2 >= 0.33 && rn2 < 0.66) {
    river_y -= 1;
  } else {
    river_y = river_y + 0;
  }

  if(river_y < b1){
    river_y += 1;
  }
  if(river_y > b2){
    river_y -= 1;
  }

  tmp = [river_x,river_y];
  return tmp;

}

module.exports.next_river_prev = function next_river_prev(river_x,river_y){
  river_x = river_x + 1;

  if(river_y == 0){
    river_y = 1;
  }else if(river_y == (size_map-1)){
    river_y = size_map - 2;
  }else{

    rn2 = Math.random();

    if (rn2 < 0.33) {
      river_y = river_y + 1;
    }else if (rn2 >= 0.33 && rn2 < 0.66) {
      river_y = river_y - 1;
    } else {
      river_y = river_y + 0;
    }
  }

    tmp = [river_x,river_y];
    return tmp;

}

/*function rotateCounterClockwise(a){
  var n=a.length;
  for (var i=0; i<n/2; i++) {
      for (var j=i; j<n-i-1; j++) {
          var tmp=a[i][j];
          a[i][j]=a[j][n-i-1];
          a[j][n-i-1]=a[n-i-1][n-j-1];
          a[n-i-1][n-j-1]=a[n-j-1][i];
          a[n-j-1][i]=tmp;
      }
  }
  return a;
}

function rotateClockwise(a) {
  var n=a.length;
  for (var i=0; i<n/2; i++) {
      for (var j=i; j<n-i-1; j++) {
          var tmp=a[i][j];
          a[i][j]=a[n-j-1][i];
          a[n-j-1][i]=a[n-i-1][n-j-1];
          a[n-i-1][n-j-1]=a[j][n-i-1];
          a[j][n-i-1]=tmp;
      }
  }
  return a;
}*/

},{"./var_global_init":7}],2:[function(require,module,exports){
const {
  size_map,
  perc_river,
  dist_bridge,
  index_river,
  index_bridge,
  player_start,
  number_players,
  player_border,
  getRandomInt,
  map_topology,
  river_coord,
  map_movement,
  map_player
} = require('./var_global_init')

module.exports.createRiverCrossing = function createRiverCrossing(s,d_b) {
// bridges are marked in map_topology with idx_bridge
// players can cross the river over bridges (map_movement changed to 1)
// s = size_map; d_b = dist_bridge;

  var num_bridge = Math.round(s/d_b);

  // divide the vector into num_bridge parts
  var r;
  var i;
  var tmp;
  for (i = 0; i < num_bridge; i++){
    r = getRandomInt(0, (d_b-1));
    tmp = river_coord[r + (i*d_b)];
    //bridge_coord[i] = tmp;
    map_topology[tmp[0]][tmp[1]] = index_bridge;
    map_movement[tmp[0]][tmp[1]] = 1;
  }
}

},{"./var_global_init":7}],3:[function(require,module,exports){
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

exportingObject.createMap = function createMap () {
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

  plot_web_topology(map_topology,char_obj,mat_move);

  tmp_char.position = {x: mat_move[3].x, y: mat_move[3].y};

  console.log(tmp_char.position)

  return char_obj
}

if (isInBrowser) {
  window.plot = function(char_obj){
    console.log('plotting map')
    plot_web_topology(map_topology,char_obj);
  }
}
},{"./createRiver":1,"./createRiverCrossing":2,"./movePlayer":4,"./player_info":5,"./startPlayer":6,"./var_global_init":7,"./visualise_web":8}],4:[function(require,module,exports){
const {
  size_map,
  perc_river,
  dist_bridge,
  index_river,
  index_bridge,
  player_start,
  number_players,
  player_border,
  getRandomInt,
  map_topology,
  river_coord,
  map_movement,
  map_player
} = require('./var_global_init')


/** getPossibleMoves 

  returns a list with all possible movements of a character

  @param character  {position:{x,y}}
  @return [{x, y, type}], where type in ('attack' | 'movement' | 'current')

*/

module.exports.getPossibleMoves = function getPossibleMoves (character){
  const x = character.position.x
  const y = character.position.y

  return [{x, y: y-1}, {x, y:y+1}, {x: x-1, y}, {x:x+1, y}].reduce((acc, { x, y }) => {
    const isOutOfBounds = x < 0 || y < 0 || x >= map_movement[0].length || y >= map_movement.length
    const isOtherPlayer = map_player[x][y] && map_player[x][y].playerId !== character.playerId
    if (isOutOfBounds || !map_movement[x][y]) return acc
    const moveType = isOtherPlayer ? 'attack' : 'movement'
    return acc.concat({x, y, type: moveType})
  }, [{x, y, type: 'current'}])
}

},{"./var_global_init":7}],5:[function(require,module,exports){
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

},{"./var_global_init":7}],6:[function(require,module,exports){
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


module.exports.spawnPlayer = function spawnPlayer(players,s,w_r,p_b){
// determine the starting position of each players
// players have a specific distance to the borders (p_b)
// players are not located in the river area (w_r)

  locPlayer = [1,2,3,4];
  var tmp;
  // if(players == 4){ // one in each quadrant
  // }else
  if(players.length == 3){
    tmp = [0,1,2,3].sample();
    locPlayer.splice(tmp,1);
  }else if(players.length == 2){
    tmp = [0,1,2,3].sample();
    locPlayer.splice(tmp,1);
    tmp = [0,1,2].sample();
    locPlayer.splice(tmp,1);
  }

  //locPlayer = [1,2,3];

  // separate the space in 4 quadrants

  // area of the river - not suitable for spawning
  var r1 = (s - w_r)/2 - 1;
  var r2 = r1 + w_r;

  // respect distance from border as selected in var_global_init
  var b1 = p_b;
  var b2 = (s - p_b) - 1;

  // quadrant 1: b1:r1, b1:r1
  // quadrant 2: b1:r1, r2:b2
  // quadrant 3: r2:b2, b1:r1
  // quadrant 4: r2:b2, r2:b2

  var startPlayer = [];
  var tmp_x;
  var tmp_y;
  if(locPlayer.includes(1)){
    tmp_x = getRandomInt(b1+1, r1-1);
    tmp_y = getRandomInt(b1+1, r1-1);
    //map_topology[tmp_x][tmp_y] = player_start;
    startPlayer.push([tmp_x,tmp_y])
  }

  if(locPlayer.includes(2)){
    tmp_x = getRandomInt(b1+1, r1-1);
    tmp_y = getRandomInt(r2+1, b2-1);
    //map_topology[tmp_x][tmp_y] = player_start;
    startPlayer.push([tmp_x,tmp_y])
  }

  if(locPlayer.includes(3)){
    tmp_x = getRandomInt(r2+1, b2-1);
    tmp_y = getRandomInt(b1+1, r1-1);
    //map_topology[tmp_x][tmp_y] = player_start;
    startPlayer.push([tmp_x,tmp_y])
  }

  if(locPlayer.includes(4)){
    tmp_x = getRandomInt(r2+1, b2-1);
    tmp_y = getRandomInt(r2+1, b2-1);
    //map_topology[tmp_x][tmp_y] = player_start;
    startPlayer.push([tmp_x,tmp_y])
  }

  var i;
  for(i = 0; i < players.length; i++){
    tmp_x = startPlayer[i][0];
    tmp_y = startPlayer[i][1];

    players[i].spawn.x = startPlayer[i][0];
    players[i].spawn.y = startPlayer[i][1];
    map_topology[tmp_x][tmp_y] = players[i].id;
  }

  return startPlayer;

}

module.exports.spawnPlayerTEST = function spawnPlayerTEST(players,s,w_r,p_b){
// determine the starting position of each players
// players have a specific distance to the borders (p_b)
// players are not located in the river area (w_r)

  locPlayer = [1,2,3];
  var r1 = (s - w_r)/2 - 1;
  var r2 = r1 + w_r;
  var b1 = p_b;
  var b2 = (s - p_b) - 1;

  // quadrant 1: b1:r1, b1:r1
  // quadrant 2: b1:r1, r2:b2
  // quadrant 3: r2:b2, b1:r1
  // quadrant 4: r2:b2, r2:b2

  var startPlayer = [];
  var tmp_x;
  var tmp_y;
  if(locPlayer.includes(1)){
    tmp_x = 4;
    tmp_y = 4;
    startPlayer.push([tmp_x,tmp_y])
  }

  if(locPlayer.includes(2)){
    tmp_x = 3;
    tmp_y = 15;
    startPlayer.push([tmp_x,tmp_y])
  }

  if(locPlayer.includes(3)){
    tmp_x = 14;
    tmp_y = 6;

    startPlayer.push([tmp_x,tmp_y])
  }

  if(locPlayer.includes(4)){
    tmp_x = 15;
    tmp_y = 15;
    //map_topology[tmp_x][tmp_y] = player_start;
    startPlayer.push([tmp_x,tmp_y])
  }

  var i;
  for(i = 0; i < players.length; i++){
    tmp_x = startPlayer[i][0];
    tmp_y = startPlayer[i][1];

    players[i].spawn.x = startPlayer[i][0];
    players[i].spawn.y = startPlayer[i][1];
    map_topology[tmp_x][tmp_y] = players[i].id;
  }

  return startPlayer;

}

module.exports.posInit = function posInit(plOj){

  var i;
  var i1;
  var i2;
  var tmp_x;
  var tmp_y;
  var tmp2;
  for(i=0; i<plOj.length; i++){
    tmp_x = plOj[i].spawn.x;
    tmp_y = plOj[i].spawn.y;
    tmp2 = plOj[i].charset;
    map_player[tmp_x][tmp_y] = tmp2[0];
    plOj[i].charset[0].position.x = tmp_x;
    plOj[i].charset[0].position.y = tmp_y;
    map_player[tmp_x][tmp_y-1] = tmp2[1];
    plOj[i].charset[1].position.x = tmp_x;
    plOj[i].charset[1].position.y = tmp_y-1;
    map_player[tmp_x][tmp_y+1] = tmp2[2];
    plOj[i].charset[2].position.x = tmp_x;
    plOj[i].charset[2].position.y = tmp_y+1;
    map_player[tmp_x-1][tmp_y] = tmp2[3];
    plOj[i].charset[3].position.x = tmp_x-1;
    plOj[i].charset[3].position.y = tmp_y;
    map_player[tmp_x+1][tmp_y] = tmp2[4];
    plOj[i].charset[4].position.x = tmp_x+1;
    plOj[i].charset[4].position.y = tmp_y;

  }


}

Array.prototype.sample = function(){
  return this[Math.floor(Math.random()*this.length)];
}

},{"./var_global_init":7}],7:[function(require,module,exports){

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

},{}],8:[function(require,module,exports){
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


const defaultOptions = {
    playerColor: {
        MKT: 'yellow',
        CVPI: 'blue'
    }
}

const defaultCharacters = [
    {
        position: { x: 4, y: 6 },
        player: 'CVPI',
        type: 'Villager'
    },
    {
        position: { x: 4, y: 7 },
        player: 'MKT',
        type: 'Sumo'
    },
    {
        position: { x: 9, y: 3 },
        player: 'CVPI',
        type: 'Witch'
    },
]

/*const defaultMovements = [
    { x: 3, y: 5, type: 'movement' },
    { x: 4, y: 5, type: 'movement' },
    { x: 5, y: 5, type: 'movement' },
    { x: 3, y: 6, type: 'movement' },
    { x: 4, y: 6, type: 'current' },
    { x: 5, y: 6, type: 'movement' },
    { x: 3, y: 7, type: 'movement' },
    { x: 4, y: 7, type: 'attack' },
    { x: 5, y: 7, type: 'movement' }
]*/
const defaultMovements = [
    { x: 0, y: 0, type: 'movement' }
]

module.exports.plot_web_topology = function plot_web_topology(matrix, characters = defaultCharacters, movements = defaultMovements, options = defaultOptions){


  // set the dimensions and margins of the graph
  var margin = {top: 30, right: 30, bottom: 30, left: 30},
    width = 450 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select("#mat_vis")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height);

var x = d3.scale.ordinal()
    .domain(d3.range(size_map))
    .rangeBands([0, width]);

var y = d3.scale.ordinal()
    .domain(d3.range(size_map))
    .rangeBands([0, height]);

var colorMap = d3.scale.linear()
    .domain([0, 1, 2, 3, 100])
    .range(["green", "blue", "brown", "black", "red"]);

var row = svg.selectAll(".row")
    .data(matrix)
  .enter().append("g")
    .attr("class", "row")
    .attr("transform", function(d, i) { return "translate(0," + y(i) + ")"; });

row.selectAll(".cell")
    .data(function(d) { return d; })
    .enter().append("rect")
    .attr("class", "cell")
    .attr("x", function(d, i) { return x(i); })
    .attr("width", x.rangeBand())
    .attr("height", y.rangeBand())
    .style("stroke-width", 0);

row.selectAll(".cell")
    .data(function(d, i) { return matrix[i]; })
    .style("fill", colorMap);

const cellWidth = x(1)
const cellHeight = y(1)

movements.forEach(({ x: cy, y: cx, type }) => {
    const color = type === 'movement' ? 'white'
        : type === 'attack' ? 'red'
        : 'blue'
    svg.append('circle')
        .attr('fill', color)
        .attr('opacity', .3)
        .attr('r', cellWidth/2)
        .attr('cx', x(cx) + cellWidth / 2)
        .attr('cy', y(cy) + cellHeight / 2)
})
characters.forEach(character => {
    const {
        position,
        type,
        player
    } = character
    const cx = x(position.y)
    const cy = y(position.x)
    const node = type === 'Villager' ? svg.append('circle').attr('r', cellWidth/4).attr('cx', cx + cellWidth / 2).attr('cy', cy + cellHeight / 2)
        : type === 'Sumo' ? svg.append('circle').attr('r', cellWidth/3).attr('cx', cx + cellWidth / 2).attr('cy', cy + cellHeight / 2).attr('stroke-dasharray', '1,2')
        : type === 'Knight' ? svg.append('ellipse').attr('rx', cellWidth /2).attr('ry', cellWidth/4).attr('cx', cx + cellWidth / 2).attr('cy', cy + cellHeight / 2).attr('stroke-dasharray', '1,2')
        : type === 'Witch' ? svg.append('path').attr('d', `M${cx+cellWidth/2},${cy + 5}l${cellWidth/2 - 2.5},${cellHeight - 10}h-${cellWidth - 5}Z`)
        : svg.append('rect').attr('x', cx - 5).attr('y', cy - 5).attr('width', 10).attr('height', 10)

    node.attr('fill', options.playerColor[player]).on('click', () => console.log(character))
})
}

},{"./var_global_init":7}]},{},[3]);
