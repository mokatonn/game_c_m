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
