/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'
import { Sky, KeyboardControls } from '@react-three/drei'
import { Player } from './Player'
import { FirstPersonView } from './FirstPersonView'
import { Cubes } from './Cubes'
import { Provider } from 'react-redux'
import { store } from '../store'

// import { Menu } from './Menu'
import { Crosshair } from './Crosshair'

import './styles.css';

export default function App() {
  // const [isActive, setIsActive] = useState(false)

  return (
    <Provider store={store}>
      <KeyboardControls
        map={[
          { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
          { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
          { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
          { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
          { name: 'jump', keys: ['Space'] },
          { name: 'openMenu', keys: ['e', 'E']}
        ]}>
        <Canvas shadows>
          <Sky sunPosition={[100, 20, 100]} />
          <ambientLight intensity={0.5} />
          <FirstPersonView />
          <Physics>
            <Player />
            <Cubes />
          </Physics>
        </Canvas>
      </KeyboardControls>
      <Crosshair />
      {/* <Menu isActive={isActive} /> */}
    </Provider>
  )
}
