export const indexCharactersByLocation = characters => {
  return Object.keys(characters).reduce((acc, characterIndex) => {
    const character = characters[characterIndex]
    acc[`${character.location_x}, ${character.location_y}`] = character
    return acc
  }, {})
}

export const getCharacterByIndexAndLocation = charactersByLocation => (location_x, location_y) => {
  return charactersByLocation[`${location_x}, ${location_y}`]
}