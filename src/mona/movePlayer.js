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


module.exports.resolvePlayerFight = function resolvePlayerFight (characterAttack, characterDefend){

  //console.log(characterAttack)
  //console.log(characterDefend)
  const char1 = characterAttack.type;
  const char2 = characterDefend.type;
  const r = Math.random(); //console.log(r)
  const fight = {};

  const success_fight = {
    Villager : {
      Villager: 0.6,
      Sumo: 0.2,
      Witch: 0.3,
      Knight: 0.3
    },
    Sumo: {
      Villager: 0.8,
      Sumo: 0.6,
      Witch: 0.8,
      Knight: 0.8
    },
    Witch: {
      Villager: 0.8,
      Sumo: 0.6,
      Witch: 0.6,
      Knight: 0.8
    },
    Knight: {
      Villager: 0.8,
      Sumo: 0.6,
      Witch: 0.6,
      Knight: 0.6
    }
  }

  if(r < success_fight[char1][char2]){// attacker wins
    fight.winner = characterAttack;
    fight.loser = characterDefend;
  }else{// attacker loses
    fight.winner = characterDefend;
    fight.loser = characterAttack;
  }
  return fight;
}
