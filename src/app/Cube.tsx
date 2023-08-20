/* eslint-disable @typescript-eslint/no-unused-vars */
import { RefObject, useState, memo, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { TextureLoader, NearestFilter, Vector3 } from 'three'
import { useBox } from '@react-three/cannon'
import { Mesh, BufferGeometry, NormalBufferAttributes, Material } from 'three'
import dirtImage from '../assets/textures/dirt.jpg'
import { ThreeEvent } from '@react-three/fiber'
import { addBlock } from '../store/modules/blocks/slice'

interface CubeProps {
  position: [number, number, number];
}

interface ICube {
  id: number;
  position: [number, number, number]
}

const CubeComponent = ({ position }: CubeProps) => {
  const dispatch = useDispatch()
  const [isHovered, setIsHovered] = useState(false)

  const [ref] = useBox(() => ({
    type: 'Static',
    position
  }))

  const dirtTexture = new TextureLoader().load(dirtImage)
  dirtTexture.magFilter = NearestFilter

  const onPointerMove = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    setIsHovered(true)
  }, [])

  const onPointerOut = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    setIsHovered(false)
  }, [])

  const addCube = useCallback((cube: ICube) => {
    dispatch(addBlock(cube))
  }, [dispatch])

  const onCubeClick = useCallback((position: Vector3, clickedFace: number) => {
    const newCubeId = Math.floor(Math.random() * 900)
    switch (clickedFace) {
      case 0: addCube({ id: newCubeId, position: [position.x + 1, position.y, position.z] }); break;
      case 1: addCube({ id: newCubeId, position: [position.x - 1, position.y, position.z] }); break;
      case 2: addCube({ id: newCubeId, position: [position.x, position.y + 1, position.z] }); break;
      case 3: addCube({ id: newCubeId, position: [position.x, position.y - 1, position.z] }); break;
      case 4: addCube({ id: newCubeId, position: [position.x, position.y, position.z + 1] }); break;
      case 5: addCube({ id: newCubeId, position: [position.x, position.y, position.z - 1] }); break;
      default: addCube({ id: newCubeId, position: [position.x + 1, position.y, position.z] }); break;
    }
  }, [addCube])

  const onClick = useCallback((e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    const clickedFace = Math.floor(e.faceIndex as number / 2)
    if (ref.current?.position) {
      onCubeClick(ref.current?.position, clickedFace)
      return
    }
  }, [onCubeClick, ref])

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
