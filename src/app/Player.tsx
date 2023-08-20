import { useRef, useEffect, RefObject } from 'react'
import {
  TextureLoader,
  NearestFilter,
  Vector3,
  BufferGeometry,
  Material,
  Mesh,
  NormalBufferAttributes
} from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import { useSphere } from '@react-three/cannon'

import groudTextureImage from '../assets/textures/ground.jpg'

const JUMP_FORCE = 4;
const SPEED = 4;

export const Player = () => {
  const [, get] = useKeyboardControls()
  const { camera } = useThree()
  const vel = useRef([0, 0, 0])
  const pos = useRef([0, 0, 0])
	const [ref, api] = useSphere(() => ({
		mass: 2,
		type: 'Dynamic',
		position: [0, 1, 0],
	}))

  const groundTexture = new TextureLoader().load(groudTextureImage)
  groundTexture.magFilter = NearestFilter

	useEffect(() => {
		const unsubscribe = api.velocity.subscribe((v) => vel.current = v)
    return unsubscribe
	}, [api.velocity])

	useEffect(() => {
		const unsubscribe = api.position.subscribe((p) => pos.current = p)
    return unsubscribe
	}, [api.position])

  useFrame(() => {
    const { forward, backward, left, right, jump } = get()

		camera.position.copy(new Vector3(pos.current[0], pos.current[1], pos.current[2]))

    const direction = new Vector3()
    const frontVector = new Vector3(0, 0, (backward ? 1 : 0) - (forward ? 1 : 0))
    const sideVector = new Vector3((left ? 1 : 0) - (right ? 1 : 0), 0, 0)

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation)

    api.velocity.set(direction.x, vel.current[1], direction.z)

    if (jump && Math.abs(vel.current[1]) < 0.05) {
			api.velocity.set(vel.current[0], JUMP_FORCE, vel.current[2])
		}
  })

  return (
    <mesh
      ref={ref as RefObject<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[]>>}
    >
      <boxGeometry attach="geometry" />
      <meshStandardMaterial
        opacity={1}
        attach="material"
        map={groundTexture}
      />
    </mesh>
  )
}
