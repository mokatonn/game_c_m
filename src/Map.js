import React, { Fragment, Component } from 'react'
import { G } from 'react-native-svg'
import Tile, { TileWidth, TileHeight } from './Tile'
import Character from './Character'
import Item from './Item'
import {
  indexCharactersByLocation,
  getCharacterByIndexAndLocation
} from './util/indexCharacters'

const reverse = (array) => {
  const result = []
  for (let i = array.length - 1; i >= 0; i--) {
    result.push(array[i])
  }
  return result
}

export default class Map extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false
  }

  render () {
    const { map, movemap, characters } = this.props
    console.log('UPDATING MAP!')

    const characterByLocation = indexCharactersByLocation(characters)
    const getCharacterByLocation = getCharacterByIndexAndLocation(characterByLocation)

    return map.map((row, rowIndex) => reverse(row).map((cell, colIndex) => {
      const key = rowIndex * row.length + colIndex
      const x = (rowIndex - colIndex) * TileWidth
      const y = (colIndex + rowIndex - row.length / 2) * TileHeight
      const character = getCharacterByLocation(colIndex, rowIndex) || null

      return <G key={ key } transform={ `translate(${x}, ${y})` }>
        <Tile cell={ cell } isMovable={ movemap[rowIndex][movemap[0].length - colIndex] } />
        {
          cell === 4
            ? <Fragment>
              <Tile cell={ 0 } isMovable={ movemap[rowIndex][movemap[0].length - colIndex] } />
              <Item type='Gem' />
            </Fragment>
          : cell === 3
            ? <Fragment>
              <Tile cell={ 0 } isMovable={ movemap[rowIndex][movemap[0].length - colIndex] } />
              <Item type='Tower' />
            </Fragment>
          : null
        }
        {
          character !== null
            ? <Character {...character} />
            : null
        }
      </G>
    }))
  }
}
