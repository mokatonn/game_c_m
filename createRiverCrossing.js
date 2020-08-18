function createRiverCrossing(s,d_b) {
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
