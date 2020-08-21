/** getPossibleMoves 

  returns a list with all possible movements of a character

  @param character  {position:{x,y}}
  @return [{x, y, type}], where type in ('attack' | 'movement')

*/

function getPossibleMoves (character){
  const x = character.position.x
  const y = character.position.y

  return [{x:x, y: y-1}, {x:x, y:y+1}, {x: x-1, y:y}, {x:x+1, y}].reduce((acc, move) => {
    const isOutOfBounds = x < 0 || y < 0 || x >= map_movement[0].length || y >= map_movement.length || !map_movement[x][y]
    const isSamePlayer = map_player[x][y] && map_player[x][y].playerId === character.playerId
    if (isOutOfBounds || !map_movement[x][y]) return acc
    const moveType = isSamePlayer ? 'attack' : 'movement'
    return acc.concat({x: move.x, y: move.y, type: moveType})
  }, [])
}

function getMoveType ({x, y}, character, map_player, map_movement) {
    if (x < 0 || y < 0 || x >= map[0].length || y >= map.length || !map_movement[x][y]) return null
    if (map_player[x][y] && map_player[x][y].playerId === character.playerId) return 'attack'
    return 'movement'
}
