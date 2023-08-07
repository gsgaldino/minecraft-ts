/* eslint-disable @typescript-eslint/no-unused-vars */
import { RefObject, useState, memo } from 'react'
import { TextureLoader, NearestFilter, Vector3 } from 'three'
import { useBox } from '@react-three/cannon'
import { Mesh, BufferGeometry, NormalBufferAttributes, Material } from 'three'
import dirtImage from '../assets/textures/dirt.jpg'
import { ThreeEvent } from '@react-three/fiber'

interface CubeProps {
  position: [number, number, number];
  onCubeClick: (cubePosition: Vector3, clickedFace: number) => void;
}

const CubeComponent = ({ position, onCubeClick }: CubeProps) => {
  console.log('RENDERED AGAIN', position)
  const [isHovered, setIsHovered] = useState(false)

  const [ref] = useBox(() => ({
    type: 'Static',
    position
  }))

  const dirtTexture = new TextureLoader().load(dirtImage)
  dirtTexture.magFilter = NearestFilter

  const onPointerMove = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    setIsHovered(true)
  }

  const onPointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    setIsHovered(false)
  }

  const onClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    const clickedFace = Math.floor(e.faceIndex as number / 2)
    if (ref.current?.position) {
      onCubeClick(ref.current?.position, clickedFace)
      return
    }
  }

  return (
    <mesh
      onPointerMove={onPointerMove}
      onPointerOut={onPointerOut}
      onClick={onClick}
      ref={ref as RefObject<Mesh<BufferGeometry<NormalBufferAttributes>, Material>>}
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

const Cube = memo(CubeComponent)

export { Cube }
