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
