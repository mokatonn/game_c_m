import React, { Fragment, useState, useEffect, useRef, Component } from 'react'
import { Animated, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Path, G } from 'react-native-svg'

export const TileWidth = 40
export const TileHeight = 30
export const TileDepth = 40
export const waterLevel = -10
export const bridgeWidth = 20

export default function Tile({ cell, ...props }) {
	switch (cell) {
		case 0:
			return <GroundTile { ...props } />
		case 1:
			return <RiverTile { ...props } />
		case 2:
			return <BridgeTile { ...props } />
		default:
			return null
	}
}

const fieldD = `M0,0L${TileWidth},${TileHeight}L0,${TileHeight*2}L${-TileWidth},${TileHeight}Z`
const soilRightD = `M${TileWidth},${TileHeight}v${TileDepth}L0,${TileHeight*2+TileDepth}v${-TileDepth}Z`
const soilLeftD = `M0,${TileHeight*2}v${TileDepth}L${-TileWidth},${TileHeight+TileDepth}v${-TileDepth}Z`
const riverD = `M0,${-waterLevel}L${TileWidth},${TileHeight-waterLevel}v${TileDepth+waterLevel}L0,${TileHeight*2+TileDepth}L${-TileWidth},${TileHeight+TileDepth}v${-TileDepth-waterLevel}Z`

class PulsatingTile extends Component {
    state = {
        opacity: 0.2,
        growing: true
    }

    componentDidMount() {
        this.timer = setInterval(()=> {
            const step = this.state.growing ? 0.02 : -0.02
            const { opacity, growing } = this.state
            const newState = { opacity, growing }
            if (growing && opacity >= .8) {
                newState.growing = false
            } else if (!growing && opacity <= .2) {
                newState.growing = true
            }
            newState.opacity = opacity + step

            this.setState(newState)
        }, 10)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render () {
        const { opacity } = this.state
        return <Path d={ fieldD } fill='cyan' style={{ opacity }} />
    }
}

function GroundTile({ isMovable }) {
    return <Fragment>
        <Path d={ soilRightD } fill='#b95'/>
    	<Path d={ soilLeftD } fill='#974'/>
        <Path d={ fieldD } fill='green' />
        {
            isMovable ? <PulsatingTile /> : null
        }
    </Fragment>
}
function RiverTile() {
    return <Path d={ riverD } fill='blue'/>
}
const bridgePaddingH = (TileWidth - bridgeWidth) / 2
const bridgePaddingV = bridgePaddingH * TileHeight / TileWidth

function BridgeTile({ isMovable }) {
    const bridgeD = `M${-TileWidth+bridgePaddingH},${TileHeight+bridgePaddingV}L${bridgePaddingH},${bridgePaddingV}L${TileWidth-bridgePaddingH},${TileHeight-bridgePaddingV}L${-bridgePaddingH},${2*TileHeight-bridgePaddingV}Z`
    return <Fragment>
    	<RiverTile />
    	<Path d={ bridgeD } fill='#642'/>
        {
            isMovable ? <PulsatingTile /> : null
        }
    </Fragment>
}
