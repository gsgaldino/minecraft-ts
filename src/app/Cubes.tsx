import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks'
import { addBlock } from '../store/modules/blocks/slice'
import { Cube } from './Cube'
import { ICube } from '../types'

export const Cubes = () => {
  const dispatch = useAppDispatch()
  const blocks = useAppSelector((state) => state.blocks)

  const ground: ICube[] = []

  for (let x = 0; x < 20; x++) {
    for (let z = 0; z < 20; z++) {
      ground.push({ id: ground.length, position: [x, -1, z] })
    }
  }

  useEffect(() => {
    for (const cube of ground) {
      dispatch(addBlock(cube))
    }
  }, [])

  

  return blocks.blocks.map((cube) => (
    <Cube key={cube.id} position={cube.position} />
  ))
}
