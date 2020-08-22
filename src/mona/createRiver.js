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
