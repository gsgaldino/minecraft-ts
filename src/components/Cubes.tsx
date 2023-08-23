import { useAppSelector } from '@/hooks'
import { Cube } from '@/components'

export const Cubes = () => {
  const cubes = useAppSelector((state) => state.blocks.blocks)

  return cubes.map((cube) => (
    <Cube key={cube.id} position={cube.position} texture="dirt" />
  ))
}
