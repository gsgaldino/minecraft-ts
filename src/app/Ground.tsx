import { TextureLoader, NearestFilter, RepeatWrapping } from 'three'
import { usePlane } from '@react-three/cannon'
import { RefObject } from 'react'
import { Mesh, BufferGeometry, NormalBufferAttributes, Material } from 'three'
import groundTexture from '../assets/textures/ground.jpg'

export const Ground = () => {
  const [ref] =  usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.5, 0]
  }))

  const texture = new TextureLoader().load(groundTexture)
  texture.magFilter = NearestFilter
  texture.wrapS = RepeatWrapping
  texture.wrapT = RepeatWrapping
  // texture.repeat.set(100, 100)

  return (
    <mesh ref={ref as RefObject<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[]>>}>
      <planeGeometry attach='geometry' args={[100, 100]} />
			<meshStandardMaterial attach='material' map={texture} />
    </mesh>
  )
}
