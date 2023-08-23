import { RefObject, useState } from 'react'
import { TextureLoader, NearestFilter } from 'three'
import { BufferGeometry, Material, Mesh, NormalBufferAttributes } from 'three'
import { ThreeEvent } from '@react-three/fiber'
import { useBox } from '@react-three/cannon'
import dirtImage from '@/assets/textures/dirt.jpg'

import { CubeTexture } from '@/types'

interface ICubeProps {
  position: [x: number, y: number, z: number]
  texture: CubeTexture
}

export const Cube = (props: ICubeProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const [cubeRef] = useBox(() => ({
    type: 'Static',
    position: props.position,
  }))

  const dirtTexture = new TextureLoader().load(dirtImage)
  dirtTexture.magFilter = NearestFilter

  const onPointerEnter = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation()
    setIsHovered(true)
  }

  const onPointerLeave = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation()
    setIsHovered(false)
  }

  return (
    <mesh
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      ref={cubeRef as RefObject<Mesh<BufferGeometry<NormalBufferAttributes>, Material>>}

    >
      <boxGeometry attach="geometry" />
      <meshStandardMaterial
        opacity={1}
        color={isHovered ? 'grey' : 'white'}
        attach="material"
        map={dirtTexture}
      />
    </mesh>
  )
}
