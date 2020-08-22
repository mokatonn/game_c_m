import React, { Fragment, useState, useEffect, useRef, Component } from 'react'
import { Animated, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Path, G } from 'react-native-svg'
import { TileWidth as width, TileHeight as height } from './Tile'

const sizeByType = {
  Villager: [-16, height - 16],
  Sumo: [-18, height - 16],
  Witch: [-18, height - 16]
}

const Character = ({ 
  player,
  type,
  location_x,
  location_y
}) => {
  const style = { width, height }
  const translate = `translate(${sizeByType[type].join(',')})`
  switch (type) {
    case 'Villager':
      return <G transform={ translate }><Image style={ style } source={ require('../assets/figures/villager/villager-fl-1.png') } /></G>
    case 'Sumo':
      return <G transform={ translate }><Image style={ style } source={ require('../assets/figures/sumo/sumo-fl-1.png') } /></G>
    case 'Witch':
    default:
      return <G transform={ translate }><Image style={ style } source={ require('../assets/figures/witch/witch-fl-1.png') } /></G>
  }
}

export default Character
