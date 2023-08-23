import { useEffect, useMemo } from 'react'
import { useAppDispatch } from '@/hooks'
import { ICube } from '@/types'
import { addBlock } from '@/store/modules/blocks/slice'

export const FlatGround = () => {
  const dispatch = useAppDispatch()

  const groundBlocks = useMemo(() => {
    const ground: ICube[] = []
    for (let x = 0; x < 20; x++) {
      for (let z = 0; z < 20; z++) {
        ground.push({ id: ground.length, position: [x, -1, z] })
      }
    }
    return ground
  }, [])

  useEffect(() => {
    for (const cube of groundBlocks) {
      dispatch(addBlock(cube))
    }
  }, [dispatch, groundBlocks])

  return null
}
