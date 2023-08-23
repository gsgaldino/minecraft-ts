import { Sky } from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import { Canvas } from '@react-three/fiber'

import { FlatGround, Player, Cubes, FirstPersonView } from '@/components'

export const FlatWorld = () => {
  return (
    <Canvas shadows>
      <FirstPersonView />
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={0.5} />
      <Physics>
        <FlatGround />
        <Player />
        <Cubes />
      </Physics>
    </Canvas>
  )
}
