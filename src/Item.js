import React, { Fragment, useState, useEffect, useRef, Component } from 'react'
import { Animated, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Path, G } from 'react-native-svg'
import { TileWidth as width, TileHeight as height } from './Tile'

const sizeByType = {
  Gem: [-16, height - 16],
  Tower: [-16, height - 40]
}

const styleByType = {
  Gem: { width: 32, height: 32},
  Tower: { width: 32, height: 64}
}

const Item = ({ type }) => {
  const style = styleByType[type]
  const translate = `translate(${sizeByType[type].join(',')})`
  switch (type) {
    case 'Tower':
      return <G transform={ translate }><Image style={ style } source={ require('../assets/tower.png') } /></G>
    case 'Gem':
    default:
      return <G transform={ translate }><Image style={ style } source={ require('../assets/gem.png') } /></G>
  }
}

export default Item
