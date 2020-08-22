import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import Svg, { G } from 'react-native-svg'
import { PanGestureHandler, PinchGestureHandler } from 'react-native-gesture-handler'
import Map from './src/Map'
import { map as pmap, movemap as m, characters_obj as characters } from './src/mona'

const width = Math.round(Dimensions.get('window').width)
const height = Math.round(Dimensions.get('window').height)
// let x = width/2, y = height/2 - 100

const map = pmap

const movemap = map.map(row => row.map(cell => 0))

let pressInCoord = [0, 0]
let pinchScale = 1
let zoomState = 1
const minX = 0
const minY = 0
const maxX = width
const maxY = height
const maxScale = 3
const minScale = 0.2

export default function App() {
  const [[x, y], setCoord] = useState([width/2, height/2 - 100])
  const [scale, setScale] = useState(1)

  const onPressIn = ({ nativeEvent }) => {
    if (zoomState <= 2) {
      pressInCoord[0] = nativeEvent.locationX
      pressInCoord[1] = nativeEvent.locationY
    }
  }
  const onTouchMove = ({ nativeEvent }) => {
    const { changedTouches } = nativeEvent
    if (changedTouches.length < 2) {
      const { locationX, locationY } = nativeEvent
      const newX = x + locationX - pressInCoord[0]
      const newY = y + locationY - pressInCoord[1]
      setCoord([Math.max(Math.min(maxX, newX), minX), Math.max(Math.min(maxY, newY), minY)])
      pressInCoord[0] = locationX
      pressInCoord[1] = locationY
    }
  }

  const onZoom = ({ nativeEvent }) => {
    const newScale = pinchScale * Math.sqrt(nativeEvent.scale)
    setScale(Math.max(Math.min(maxScale, newScale), minScale))
  }

  const onZoomStateChange = ({ nativeEvent }) => {
    const { state } = nativeEvent
    if (zoomState === 2 && state === 4) {
      pinchScale = scale
    }
    if (zoomState !== state) {
      zoomState = state
    }
  }

  return (
    <View style={ styles.container }>
      <PinchGestureHandler
        onGestureEvent={ onZoom }
        onHandlerStateChange={ onZoomStateChange }
      >
        <Svg
          width={ width }
          height={ height }
          style={ styles.svg }
          onPressIn={ onPressIn }
          onTouchMove={ onTouchMove }
        >
          <G transform={ `translate(${x}, ${y}), scale(${scale})` }>
            <Map map={ map } movemap={ movemap } characters={ characters } />
          </G>
        </Svg>
      </PinchGestureHandler>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    width,
    height,
    backgroundColor: '#000'
  }
})
