function spawnPlayer(players,s,w_r,p_b){
// determine the starting position of each players
// players have a specific distance to the borders (p_b)
// players are not located in the river area (w_r)

  locPlayer = [1,2,3,4];
  var tmp;
  // if(players == 4){ // one in each quadrant
  // }else
  if(players == 3){
    tmp = [0,1,2,3].sample();
    locPlayer.splice(tmp,1);
  }else if(players == 2){
    tmp = [0,1,2,3].sample();
    locPlayer.splice(tmp,1);
    tmp = [0,1,2].sample();
    locPlayer.splice(tmp,1);
  }

  locPlayer = [1,2,3];

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
    map_topology[tmp_x][tmp_y] = player_start;
    startPlayer.push([tmp_x,tmp_y])
  }

  if(locPlayer.includes(2)){
    tmp_x = getRandomInt(b1+1, r1-1);
    tmp_y = getRandomInt(r2+1, b2-1);
    map_topology[tmp_x][tmp_y] = player_start;
    startPlayer.push([tmp_x,tmp_y])
  }

  if(locPlayer.includes(3)){
    tmp_x = getRandomInt(r2+1, b2-1);
    tmp_y = getRandomInt(b1+1, r1-1);
    map_topology[tmp_x][tmp_y] = player_start;
    startPlayer.push([tmp_x,tmp_y])
  }

  if(locPlayer.includes(4)){
    tmp_x = getRandomInt(r2+1, b2-1);
    tmp_y = getRandomInt(r2+1, b2-1);
    map_topology[tmp_x][tmp_y] = player_start;
    startPlayer.push([tmp_x,tmp_y])
  }

  return startPlayer;

}

function spawnPlayerTEST(players,s,w_r,p_b){

  locPlayer = [1,2,3];

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
    tmp_x = 4;
    tmp_y = 5;
    map_topology[tmp_x][tmp_y] = player_start;
    startPlayer.push([tmp_x,tmp_y])
  }

  if(locPlayer.includes(2)){
    tmp_x = 4;
    tmp_y = 16;
    map_topology[tmp_x][tmp_y] = player_start;
    startPlayer.push([tmp_x,tmp_y])
  }

  if(locPlayer.includes(3)){
    tmp_x = 15;
    tmp_y = 5;
    map_topology[tmp_x][tmp_y] = player_start;
    startPlayer.push([tmp_x,tmp_y])
  }

  if(locPlayer.includes(4)){
    tmp_x = 15;
    tmp_y = 15;
    map_topology[tmp_x][tmp_y] = player_start;
    startPlayer.push([tmp_x,tmp_y])
  }

  return startPlayer;

}

function posInit(loc){

  var i;
  var i1;
  var i2;
  var tmp;
  for(i=0; i<loc.length; i++){
    tmp = loc[i];
    map_player[tmp[0]][tmp[1]] = 1 + i;
    map_player[tmp[0]][tmp[1]-1] = 1 + i;
    map_player[tmp[0]][tmp[1]+1] = 1 + i;
    map_player[tmp[0]-1][tmp[1]] = 1 + i;
    map_player[tmp[0]+1][tmp[1]] = 1 + i;
  }


}

Array.prototype.sample = function(){
  return this[Math.floor(Math.random()*this.length)];
}
